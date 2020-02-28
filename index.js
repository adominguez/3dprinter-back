const express = require("express");
const schedule = require('./schedule');
const appPrinters = require('./routes/appPrinters');
const appMaterials = require('./routes/appMaterials');
const appCategories = require('./routes/appCategories');
const bodyParser = require('body-parser');


app = express();
var PORT = process.env.PORT || 3128;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/**
 * Get Printers
 */
appPrinters.getPrinters(app);
appMaterials.getMaterials(app);
appCategories.getCategories(app);

// schedule tasks to be run on the server
// 'seg min hora * * *'
schedule.cron('00 44 21 * * *');

// Server port listening
app.listen(PORT, function () {
  console.log('Express served in the port ' + PORT)
  console.log('http://localhost:' + PORT)
});

