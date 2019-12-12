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
        console.log('Amazon price', price)
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
        console.log('Aliexpress price', price)
        // firebase.db.ref('logPrices').push(price)
    });
};

exports.getGearbestProductPrice = (link) => {
    console.log('Entrando en gearbest')
    const pool = new https.Agent({ keepAlive: true });
    const options = {
        url: link,
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
             * TODO Enviamos un correo para informar de que ha habido un error.
             */
            return console.error(error);
        }
        const price = html.match(/"price": "(.*?)"/g)[0].replace('"price": "', '').replace('"', '') || null
        console.log('Gearbest price', price);
        // firebase.db.ref('logPrices').push(price)
    });
};