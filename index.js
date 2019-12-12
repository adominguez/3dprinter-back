const express = require("express");
const getPrices = require('./getPrices');
const schedule = require('./schedule');
const appPrinters = require('./routes/appPrinters');

 
app = express();

// schedule tasks to be run on the server   
const amazonlink = 'https://ws-eu.assoc-amazon.com/widgets/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=3dmakernow-21&language=es_ES&o=30&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B077K4QWMT&linkId=9f8d55cc8bb0930a4baa79034bde3622';
const gearbestLink = 'https://www.gearbest.com/3d-printers-3d-printer-kits/pp_640022.html?lkid=15117381';
const aliexpressLink = 'https://es.aliexpress.com/item/4000244565621.html';
const firebase = require('./app');

//getPrices.getAmazonProductPrice(amazonlink);
//getPrices.getGearbestProductPrice(gearbestLink);
//getPrices.getAliexpressProductPrice(aliexpressLink);

/**
 * Get Printers
 */
appPrinters.getPrinters(app);

// 'seg min hora * * *'
//schedule.cron('40 25 21 * * *');

app.listen(3128);