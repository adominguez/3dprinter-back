const https = require('https');
var cheerio = require('cheerio');
var request = require('request');
const firebase = require('../app');
const sendEmail = require('../utils/sendEmail');

const intervalProduct = (intervalVal, incrementVal, arrayData, functionToExecute) => {
  let interval = intervalVal,
    increment = incrementVal;
  arrayData.forEach((element, item) => {
    var runner = setTimeout(() => {
      functionToExecute();
      clearTimeout(runner);
    }, interval * increment);

    increment = increment + 1;
  });
}

const getAmazonPriceByCountry = (countryCode, html) => {
  var price = ''
  switch (countryCode) {
    case 'ES':
      price = parseFloat(html('#price_inside_buybox').text().replace('€', '').replace(',', '.').replace(' ', '') || 0).toFixed(2) || "No disponible";
      break;
    case 'MX':
      price = parseFloat(html('#price_inside_buybox').text().replace('$', '').replace(',', '').replace(' ', '') || 0).toFixed(2) || "No disponible";
      break;
    case 'US':
      price = parseFloat(html('#price_inside_buybox').text().replace('US$', '').replace(' ', '') || 0).toFixed(2) || "No disponible";
      break;
    default:
      break;
  }
  return price;
}

const amazonOptionsRequest = (informationLink) => {
  return {
    url: informationLink,
    method: 'GET',
    headers: {
      Accept: '*/*',
      'Accept-Encoding': '*',
      Connection: 'keep-alive',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
    }
  }
}

const getAmazonPageInformation = (countryCode, html, informationLink) => {
  const $ = cheerio.load(html);
  const amazonPrice = getAmazonPriceByCountry(countryCode, $)
  const prime = $('#priceblock_ourprice_row #price-shipping-message').text().replace('Ver detalles', '').replace(' ', '');
  const amazonRatings = parseFloat($('#acrCustomerReviewText').text().replace(' valoraciones', '').replace(' calificaciones', '').replace(' ', '').replace(',', '') || 0);
  const amazonRate = parseFloat($('#acrPopover').text().replace(' de 5 estrellas', '').replace(' ', '').replace(',', '.') || 0);

  if (amazonPrice === '0.00') {
    // sendEmail.sendAvailabilityEmail(name, informationLink, 'Amazon');
  }
  return {
    amazonPrice,
    prime,
    amazonRatings,
    amazonRate
  }
}

const updateAffiliateAmazonDatabase = (instance, id, countryCode, data) => {
  /**
   * Actualizamos los datos de affiliateAmazonInfo de la impresora en la base de datos con los nuevos datos de la impresora.
   */
  firebase.db.ref(instance)
    .child(id)
    .child('affiliateAmazonInfo')
    .child(countryCode)
    .update(data)
}

const updateAffiliateAmazonInfoByProduct = (product, countryCode, instance) => {
  const {
    informationLink,
    amazonPrice: dbAmazonPrice,
    amazonRatings: dbAmazonRatings,
    amazonRate: dbAmazonRate,
    amazonPrime: dbPrime,
    asin,
    updateDate,
    id,
    productName: name,
    subproduct
  } = product;
  request(amazonOptionsRequest(informationLink), (error, response, html) => {
    if (error) {
      sendEmail.errorRequestAutommaticallyUpdate(name, id, 'Amazon', error);
      return console.error(error);
    }
    const {
      amazonPrice,
      prime,
      amazonRatings,
      amazonRate
    } = getAmazonPageInformation(countryCode, html, informationLink);

    /**
     * Comprueba si se han realizado cambios en los datos
     */
    const updated = prime.includes('GRATIS') !== dbPrime || dbAmazonPrice !== amazonPrice || dbAmazonRate !== amazonRate || dbAmazonRatings !== amazonRatings;
    if (updated) {
      const data = {
        updateDate: `${new Date()}`,
        amazonRatings,
        amazonRate,
        amazonPrime: prime.includes('GRATIS'),
        amazonPrice
      }
      /**
         * Actualizamos los datos de affiliateAmazonInfo de la impresora en la base de datos con los nuevos datos de la impresora.
         */
      if (subproduct) {
        firebase.db.ref(instance)
          .child(id)
          .child('affiliateAmazonInfo')
          .child(countryCode)
          .child(asin)
          .update(data)
      } else {
        firebase.db.ref(instance)
          .child(id)
          .child('affiliateAmazonInfo')
          .child(countryCode)
          .update(data)
      }
    }
  });
}

const updateAffiliateAliexpressInfoByProduct = (product, instance) => {
  const {
    informationLink,
    aliexpressPrice: dbAliexpressPrice,
    aliexpressRatings: dbAliexpressRatings,
    aliexpressRate: dbAliexpressRate,
    updateDate,
    asin,
    productName: name,
    id,
    subproduct
  } = product;
  const options = {
    url: informationLink,
    method: 'GET',
    headers: {
      Accept: '*/*',
      'Accept-Encoding': '*',
      Connection: 'keep-alive',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
    }
  }
  request(options, (error, response, html) => {
    if (error) {
      sendEmail.errorRequestAutommaticallyUpdate(name, id, 'Aliexpress', error);
      return console.error(error);
    }
    const aliexpressPrice = parseFloat(html.match(/totalValue: "(.*?)"/g) && html.match(/totalValue: "(.*?)"/g)[0].replace('totalValue: "€ ', '').replace('"', '').replace(',', '.') || 0).toFixed(2) || null;
    const aliexpressRatings = parseFloat(html.match(/"totalValidNum":(.*?),/g) && html.match(/"totalValidNum":(.*?),/g)[0].replace('"totalValidNum":', '').replace('"', '').replace(',', '.') || 0) || null;
    const aliexpressRate = parseFloat(html.match(/"averageStar":(.*?),/g) && html.match(/"averageStar":(.*?),/g)[0].replace('"averageStar":', '').replace('"', '').replace(',', '.') || 0) || null;

    /**
     * Comprueba si se han realizado cambios en los datos
     */
    const updated = dbAliexpressPrice !== aliexpressPrice || dbAliexpressRate !== aliexpressRate || dbAliexpressRatings !== aliexpressRatings;
    if (updated) {
      const data = {
        updateDate: `${new Date()}`,
        aliexpressPrice,
        aliexpressRatings,
        aliexpressRate
      }
      /**
       * Actualizamos los datos de aliexpress del producto en la base de datos con los nuevos datos del producto
       */
      if (subproduct) {
        firebase.db.ref(instance)
          .child(id)
          .child('affiliateAliexpress')
          .child(asin)
          .update(data)
      } else {
        firebase.db.ref(instance)
          .child(id)
          .child('affiliateAliexpress')
          .update(data)
      }
    }
  });
}

const updateAffiliateGearbestInfoByProduct = (product, instance) => {
  const {
    informationLink,
    gearbestPrice: dbGearbestPrice,
    gearbestRate: dbGearbestRate,
    gearbestRatings: dbGearbestRatings,
    updateDate,
    asin,
    productName: name,
    id,
    subproduct
  } = product;
  const options = {
    url: informationLink,
    method: 'GET',
    headers: {
      Accept: '*/*',
      'Accept-Encoding': '*',
      Connection: 'keep-alive',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
    }
  }
  request(options, function (error, response, html) {
    if (error) {
      sendEmail.errorRequestAutommaticallyUpdate(name, id, 'Gearbest', error);
      return console.error(error);
    }
    const gearbestPrice = parseFloat(html.match(/"price": "(.*?)"/g) && html.match(/"price": "(.*?)"/g)[0].replace('"price": "', '').replace('"', '') || 0).toFixed(2) || null
    const gearbestRate = parseFloat(html.match(/"ratingValue": "(.*?)"/g) && html.match(/"ratingValue": "(.*?)"/g)[0].replace('"ratingValue": "', '').replace('"', '') || 0) || null
    const gearbestRatings = parseFloat(html.match(/"reviewCount": "(.*?)"/g) && html.match(/"reviewCount": "(.*?)"/g)[0].replace('"reviewCount": "', '').replace('"', '') || 0) || null

    /**
     * Comprueba si se han realizado cambios en los datos
     */
    const updated = dbGearbestPrice !== gearbestPrice || dbGearbestRate !== gearbestRate || dbGearbestRatings !== gearbestRatings;
    if (updated) {
      const data = {
        updateDate: `${new Date()}`,
        gearbestPrice,
        gearbestRate,
        gearbestRatings
      }
      /**
       * Actualizamos los datos de aliexpress del producto en la base de datos con los nuevos datos del producto
       */
      if (subproduct) {
        firebase.db.ref(instance)
          .child(id)
          .child('affiliateGearbestInfo')
          .child(asin)
          .update(data)
      } else {
        firebase.db.ref(instance)
          .child(id)
          .child('affiliateGearbestInfo')
          .update(data)
      }
    }
  });
}

exports.getAmazonProductPrice = (products, instance) => {
  const { spanishProducts, mxProducts, usaProducts } = products;
  let intervalSpanishProducts = 5000, // 5000
    incrementSpanishProducts = 1;
  let intervalMexicanProducts = 7500, // 7500
    incrementMexicanProducts = 1;
  let intervalUsaProducts = 9700, // 97000
    incrementUsaProducts = 1;

  /**
   * Obtenemos información de los productos de España
   */
  spanishProducts.forEach(element => {
    var runner = setTimeout(() => {
      updateAffiliateAmazonInfoByProduct(element, 'ES', instance)
      clearTimeout(runner);
    }, intervalSpanishProducts * incrementSpanishProducts);

    incrementSpanishProducts = incrementSpanishProducts + 1;
  });

  /**
   * Obtenemos información de los productos de Mexico
   */
  mxProducts.forEach(element => {
    var runner = setTimeout(() => {
      updateAffiliateAmazonInfoByProduct(element, 'MX', instance)
      clearTimeout(runner);
    }, intervalMexicanProducts * incrementMexicanProducts);

    incrementMexicanProducts = incrementMexicanProducts + 1;
  });

  /**
   * Obtenemos información de los productos de USA
   */
  usaProducts.forEach(element => {
    var runner = setTimeout(() => {
      updateAffiliateAmazonInfoByProduct(element, 'US', instance)
      clearTimeout(runner);
    }, intervalUsaProducts * incrementUsaProducts);

    incrementUsaProducts = incrementUsaProducts + 1;
  });
};

exports.getAliexpressProductPrice = (products, instance) => {
  let aliexpressInterval = 5000, // 5000
    aliexpressIncremental = 1;
  /**
   * Obtenemos información de los productos
   */
  products.forEach(element => {
    var runner = setTimeout(() => {
      updateAffiliateAliexpressInfoByProduct(element, instance)
      clearTimeout(runner);
    }, aliexpressInterval * aliexpressIncremental);

    aliexpressIncremental = aliexpressIncremental + 1;
  });
};

exports.getGearbestProductPrice = (products, instance) => {
  let gearbestInterval = 5000, // 5000
    gearbestIncremental = 1;
  /**
   * Obtenemos información de los productos
   */
  products.forEach(element => {
    var runner = setTimeout(() => {
      updateAffiliateGearbestInfoByProduct(element, instance)
      clearTimeout(runner);
    }, gearbestInterval * gearbestIncremental);

    gearbestIncremental = gearbestIncremental + 1;
  });
};

exports.formatAffiliateInfo = (data, country) => {
  const { affiliateAmazonInfo, affiliateAliexpress, affiliateGearbestInfo } = data;
  let amazonList = [];
  let aliexpressList = [];
  let gearbestList = [];

  if (!affiliateAmazonInfo[country].asin) {
    Object.entries(affiliateAmazonInfo[country]).forEach(([id, value]) => { amazonList.push({ id, ...value }) })
  } else {
    affiliateAmazonInfo && amazonList.push(affiliateAmazonInfo[country])
  }

  if (affiliateAliexpress && !affiliateAliexpress.asin) {
    Object.entries(affiliateAliexpress).forEach(([id, value]) => { aliexpressList.push({ id, ...value }) })
  } else {
    affiliateAliexpress && aliexpressList.push(affiliateAliexpress)
  }

  if (affiliateGearbestInfo && !affiliateGearbestInfo.asin) {
    Object.entries(affiliateGearbestInfo).forEach(([id, value]) => { gearbestList.push({ id, ...value }) })
  } else {
    affiliateGearbestInfo && gearbestList.push(affiliateGearbestInfo)
  }
  const amazonInfo = { affiliateAmazonInfo: amazonList };
  const aliexpressInfo = { affiliateAliexpress: aliexpressList };
  const gearbestInfo = { affiliateGearbestInfo: gearbestList };
  return {amazonInfo, aliexpressInfo, gearbestInfo}
}

exports.formatProducts = (products) => {
  return new Promise(resolve => {
    let spanishProducts = [];
    let mxProducts = [];
    let usaProducts = [];
    let aliexpressProducts = [];
    let gearbestProducts = [];
    let productsElements = [];
    Object.entries(products).forEach(([id, value]) => {
      productsElements.push({ id, ...value })
    });
    productsElements.forEach(element => {
      const { affiliateAmazonInfo: { ES, MX, US }, affiliateAliexpress, affiliateGearbestInfo, id, name: productName } = element;
      /**
       * Añadimos los productos de ES
       */
      if (ES) {
        if (ES.asin) {
          spanishProducts.push({ ...ES, id, productName, subproduct: false });
        } else {
          Object.values(ES).forEach(item => spanishProducts.push({ ...item, id, productName, subproduct: true }))
        }
      }
      /**
       * Añadimos los productos de MX
       */
      if (MX) {
        if (MX.asin) {
          mxProducts.push({ ...MX, id, productName, subproduct: false });
        } else {
          Object.values(MX).forEach(item => mxProducts.push({ ...item, id, productName, subproduct: true }))
        }
      }
      /**
       * Añadimos los productos de US
       */
      if (US) {
        if (US.asin) {
          usaProducts.push({ ...US, id, productName, subproduct: false });
        } else {
          Object.values(US).forEach(item => usaProducts.push({ ...item, id, productName, subproduct: true }))
        }
      }
      /**
       * Añadimos los productos de aliexpress
       */
      if (affiliateAliexpress) {
        if (affiliateAliexpress.asin) {
          aliexpressProducts.push({ ...affiliateAliexpress, id, productName, subproduct: false });
        } else {
          Object.values(affiliateAliexpress).forEach(item => aliexpressProducts.push({ ...item, id, productName, subproduct: true }))
        }
      }
      /**
       * Añadimos los productos de Gearbest
       */
      if (affiliateGearbestInfo) {
        if (affiliateGearbestInfo.asin) {
          gearbestProducts.push({ ...affiliateGearbestInfo, id, productName, subproduct: false });
        } else {
          Object.values(affiliateGearbestInfo).forEach(item => gearbestProducts.push({ ...item, id, productName, subproduct: true }))
        }
      }
      resolve({ spanishProducts, mxProducts, usaProducts, aliexpressProducts, gearbestProducts });
    })
  });
}
