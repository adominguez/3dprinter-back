const https = require('https');
var cheerio = require('cheerio');
var request = require('request');
const firebase = require('./app');

exports.getAmazonProductPrice = (link) => {
    request(link, function (error, response, html) {
        if (error) {
            /**
             * TODO Enviamos un correo para informar de que ha habido un error.
             */
            return console.error(error);
        }
        var $ = cheerio.load(html);
        const price = $('.price').text().replace('EUR ', '').replace('No disponible', null);
        // firebase.db.ref('logPrices').push(price)
    });
};

exports.getAliexpressProductPrice = (link) => {
    request(link, function (error, response, html) {
        if (error) {
            /**
             * TODO Enviamos un correo para informar de que ha habido un error.
             */
            return console.error(error);
        }
        const price = html.match(/totalValue: "(.*?)"/g)[0].replace('totalValue: "€ ', '').replace('"', '') || null
        // firebase.db.ref('logPrices').push(price)
    });
};

exports.getGearbestProductPrice = (link) => {
    console.log('Entrando en gearbest')
    request(link, function (error, response, html) {
        if (error) {
            /**
             * TODO Enviamos un correo para informar de que ha habido un error.
             */
            return console.error(error);
        }
        console.log(html)
        var $ = cheerio.load(html);
        // const price = $('.price').text().replace('EUR ', '').replace('No disponible', null);
        // firebase.db.ref('logPrices').push(price)
    });
};