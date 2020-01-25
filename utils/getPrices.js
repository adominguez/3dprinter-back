const https = require('https');
var cheerio = require('cheerio');
var request = require('request');
const firebase = require('../app');
const email = require('../utils/email');

exports.getAmazonProductPrice = (id) => {
  firebase.db.ref('3d-printers')
    .child(id)
    .transaction(current => {
      const { affiliateAmazonInfo } = current;
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
            /**
             * Enviamos un correo para informar de que ha habido un error.
             */
            const data = {
              subject: 'Ha habido un error al actualizar la información de la impresora con id ' + id,
              message: `La impresora con id <b>${id}</b> está teniendo problemas en su actualización, al acceder a Amazon. <br/> este es el error:<br/>` + error,
              type: 'error'
            }
            email.sendEmail(data);
            return console.error(error);
          }
          const $ = cheerio.load(html);
          const amazonPrice = parseFloat($('#priceblock_ourprice').text().replace('€', '').replace(',', '.').replace(' ', ''));
          const prime = $('#priceblock_ourprice_row #price-shipping-message').text().replace('Ver detalles', '').replace(' ', '');
          const amazonRatings = parseFloat($('#acrCustomerReviewText').text().replace(' valoraciones', '').replace(' ', ''));
          const amazonRate = parseFloat($('#acrPopover').text().replace(' de 5 estrellas', '').replace(' ', '').replace(',', '.'));

          /**
           * Comprueba si se han realizado cambios en los datos
           */
          const updated = prime.includes('GRATIS') !== dbPrime || dbAmazonPrice !== amazonPrice || dbAmazonRate !== amazonRate || dbAmazonRatings !== amazonRatings;
          const data = {
            updateDate: updated ? `${new Date()}` : updateDate,
            affiliateAmazonInfo: {
              ...affiliateAmazonInfo,
              updateDate: updated ? `${new Date()}` : updateDate,
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
        });
      }
    });
};

exports.getAliexpressProductPrice = (id) => {
  firebase.db.ref('3d-printers')
    .child(id)
    .transaction(current => {
      const { affiliateAliexpress } = current;
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
            /**
             * Enviamos un correo para informar de que ha habido un error.
             */
            const data = {
              subject: 'Ha habido un error al actualizar la información de la impresora con id ' + id,
              message: `La impresora con id <b>${id}</b> está teniendo problemas en su actualización, al acceder a Aliexpress. <br/> este es el error:<br/>` + error,
              type: 'error'
            }
            email.sendEmail(data);
            return console.error(error);
          }
          const aliexpressPrice = parseFloat(html.match(/totalValue: "(.*?)"/g)[0].replace('totalValue: "€ ', '').replace('"', '').replace(',', '.')) || null;
          const aliexpressRatings = parseFloat(html.match(/"totalValidNum":(.*?),/g)[0].replace('"totalValidNum":', '').replace('"', '').replace(',', '.')) || null;
          const aliexpressRate = parseFloat(html.match(/"averageStar":(.*?),/g)[0].replace('"averageStar":', '').replace('"', '').replace(',', '.')) || null;

          /**
           * Comprueba si se han realizado cambios en los datos
           */
          const updated = dbAliexpressPrice !== aliexpressPrice || dbAliexpressRate !== aliexpressRate || dbAliexpressRatings !== aliexpressRatings;
          const data = {
            updateDate: updated ? `${new Date()}` : updateDate,
            affiliateAliexpress: {
              ...affiliateAliexpress,
              updateDate: updated ? `${new Date()}` : updateDate,
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
        });
      }
    })
};

exports.getGearbestProductPrice = (id) => {
  firebase.db.ref('3d-printers')
    .child(id)
    .transaction(current => {
      const { affiliateGearbestInfo } = current;
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
            /**
             * Enviamos un correo para informar de que ha habido un error.
             */
            const data = {
              subject: 'Ha habido un error al actualizar la información de la impresora con id ' + id,
              message: `La impresora con id <b>${id}</b> está teniendo problemas en su actualización, al acceder a gearbest. <br/> este es el error:<br/>` + error,
              type: 'error'
            }
            email.sendEmail(data);
            return console.error(error);
          }
          const gearbestPrice = parseFloat(html.match(/"price": "(.*?)"/g)[0].replace('"price": "', '').replace('"', '')) || null
          const gearbestRate = parseFloat(html.match(/"ratingValue": "(.*?)"/g)[0].replace('"ratingValue": "', '').replace('"', '')) || null
          const gearbestRatings = parseFloat(html.match(/"reviewCount": "(.*?)"/g)[0].replace('"reviewCount": "', '').replace('"', '')) || null

          /**
           * Comprueba si se han realizado cambios en los datos
           */
          const updated = dbGearbestPrice !== gearbestPrice || dbGearbestRate !== gearbestRate || dbGearbestRatings !== gearbestRatings;
          const data = {
            updateDate: updated ? `${new Date()}` : updateDate,
            affiliateGearbestInfo: {
              ...affiliateGearbestInfo,
              updateDate: updated ? `${new Date()}` : updateDate,
              gearbestPrice,
              gearbestRate,
              gearbestRatings
            }
          }
          /**
           * Actualizamos los datos de affiliateAmazonInfo de la impresora en la base de datos con los nuevos datos de la impresora.
           */
          firebase.db.ref('3d-printers')
            .child(id)
            .update(data)
        });
      }
    });
};
