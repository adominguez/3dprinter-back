const https = require('https');
var cheerio = require('cheerio');
var request = require('request');
const firebase = require('../app');
const sendEmail = require('../utils/sendEmail');

exports.getAmazonProductPrice = (id) => {
  firebase.db.ref('3d-printers')
    .child(id)
    .transaction(current => {
      const { affiliateAmazonInfo, name } = current;
      /**
       * Si existe affiliateAmazonInfo data
       */
      if (affiliateAmazonInfo && affiliateAmazonInfo.informationLink) {
        const {
          informationLink,
          amazonPrice: dbAmazonPrice,
          amazonRatings: dbAmazonRatings,
          amazonRate: dbAmazonRate,
          amazonPrime: dbPrime,
          updateDate
        } = affiliateAmazonInfo;

        request(informationLink, (error, response, html) => {
          if (error) {
            sendEmail.errorRequestAutommaticallyUpdate(name, id, 'Amazon', error);
            return console.error(error);
          }
          const $ = cheerio.load(html);
          const amazonPrice = parseFloat($('#priceblock_ourprice').text().replace('€', '').replace(',', '.').replace(' ', '') || 0).toFixed(2) || "No disponible";
          const prime = $('#priceblock_ourprice_row #price-shipping-message').text().replace('Ver detalles', '').replace(' ', '');
          const amazonRatings = parseFloat($('#acrCustomerReviewText').text().replace(' valoraciones', '').replace(' ', '') || 0);
          const amazonRate = parseFloat($('#acrPopover').text().replace(' de 5 estrellas', '').replace(' ', '').replace(',', '.') || 0);

          if(amazonPrice === '0.00') {
            sendEmail.sendAvailabilityEmail(name, informationLink, 'Amazon');
          }

          /**
           * Comprueba si se han realizado cambios en los datos
           */
          const updated = prime.includes('GRATIS') !== dbPrime || dbAmazonPrice !== amazonPrice || dbAmazonRate !== amazonRate || dbAmazonRatings !== amazonRatings;
          if(updated) {
            const data = {
              affiliateAmazonInfo: {
                ...affiliateAmazonInfo,
                updateDate: `${new Date()}`,
                amazonRatings,
                amazonRate,
                amazonPrime: prime.includes('GRATIS'),
                amazonPrice
              }
            }
            /**
             * Actualizamos los datos de affiliateAmazonInfo de la impresora en la base de datos con los nuevos datos de la impresora.
             */
            firebase.db.ref('3d-printers')
              .child(id)
              .update(data)
          }
        });
      }
    });
};

exports.getAliexpressProductPrice = (id) => {
  firebase.db.ref('3d-printers')
    .child(id)
    .transaction(current => {
      const { affiliateAliexpress, name } = current;
      /**
       * Si existe affiliateAliexpress data
       */
      if (affiliateAliexpress && affiliateAliexpress.informationLink) {
        const {
          informationLink,
          aliexpressPrice: dbAliexpressPrice,
          aliexpressRatings: dbAliexpressRatings,
          aliexpressRate: dbAliexpressRate,
          updateDate
        } = affiliateAliexpress;
        request(informationLink, (error, response, html) => {
          if (error) {
            sendEmail.errorRequestAutommaticallyUpdate(name, id, 'Aliexpress', error);
            return console.error(error);
          }
          const aliexpressPrice = parseFloat(html.match(/totalValue: "(.*?)"/g) && html.match(/totalValue: "(.*?)"/g)[0].replace('totalValue: "€ ', '').replace('"', '').replace(',', '.') || 0).toFixed(2) || null;
          const aliexpressRatings = parseFloat(html.match(/"totalValidNum":(.*?),/g) && html.match(/"totalValidNum":(.*?),/g)[0].replace('"totalValidNum":', '').replace('"', '').replace(',', '.') || 0) || null;
          const aliexpressRate = parseFloat(html.match(/"averageStar":(.*?),/g) && html.match(/"averageStar":(.*?),/g)[0].replace('"averageStar":', '').replace('"', '').replace(',', '.') || 0) || null;

          if(aliexpressPrice === '0.00') {
            sendEmail.sendAvailabilityEmail(name, informationLink, 'Aliexpress');
          }

          /**
           * Comprueba si se han realizado cambios en los datos
           */
          const updated = dbAliexpressPrice !== aliexpressPrice || dbAliexpressRate !== aliexpressRate || dbAliexpressRatings !== aliexpressRatings;
          if(updated) {
            const data = {
              affiliateAliexpress: {
                ...affiliateAliexpress,
                updateDate: `${new Date()}`,
                aliexpressPrice,
                aliexpressRatings,
                aliexpressRate
              }
            }
            /**
             * Actualizamos los datos de affiliateAmazonInfo de la impresora en la base de datos con los nuevos datos de la impresora.
             */
            firebase.db.ref('3d-printers')
              .child(id)
              .update(data)
          }
        });
      }
    })
};

exports.getGearbestProductPrice = (id) => {
  firebase.db.ref('3d-printers')
    .child(id)
    .transaction(current => {
      const { affiliateGearbestInfo, name } = current;
      /**
       * Si existe affiliateGearbestInfo data
       */
      if (affiliateGearbestInfo && affiliateGearbestInfo.informationLink) {
        const {
          informationLink,
          gearbestPrice: dbGearbestPrice,
          gearbestRate: dbGearbestRate,
          gearbestRatings: dbGearbestRatings,
          updateDate
        } = affiliateGearbestInfo;
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

          if(gearbestPrice === '0.00') {
            sendEmail.sendAvailabilityEmail(name, informationLink, 'Gearbest');
          }

          /**
           * Comprueba si se han realizado cambios en los datos
           */
          const updated = dbGearbestPrice !== gearbestPrice || dbGearbestRate !== gearbestRate || dbGearbestRatings !== gearbestRatings;
          if(updated) {
            const data = {
              affiliateGearbestInfo: {
                ...affiliateGearbestInfo,
                updateDate: `${new Date()}`,
                gearbestPrice,
                gearbestRate,
                gearbestRatings
              }
            }
            /**
             * Actualizamos los datos de affiliateGearbestInfo de la impresora en la base de datos con los nuevos datos de la impresora.
             */
            firebase.db.ref('3d-printers')
              .child(id)
              .update(data)
          }
        });
      }
    });
};
