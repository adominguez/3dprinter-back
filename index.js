const express = require("express");
const getPrices = require('./utils/getPrices');
const schedule = require('./schedule');
const appPrinters = require('./routes/appPrinters');
const appCategories = require('./routes/appCategories');
const bodyParser = require('body-parser');


app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/**
 * Get Printers
 */
appPrinters.getPrinters(app);
appCategories.getCategories(app);

// schedule tasks to be run on the server
// 'seg min hora * * *'
schedule.cron('40 25 21 * * *');

app.listen(3128);
