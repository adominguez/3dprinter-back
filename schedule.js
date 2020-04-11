const cron = require("node-cron");
const firebase = require('./app');
const getPrices = require('./utils/getPrices');

exports.cronPrinters = (scheduleTime) => {
  cron.schedule(scheduleTime, async () => {
    try {
      /**
       * Obtenemos todas las impresoras
       */
      const printersdb = await firebase.db.ref('3d-printers');
      const printers = await printersdb.once('value');
      const printersData = printers.val();
      const {
        spanishProducts,
        mxProducts,
        usaProducts,
        aliexpressProducts,
        gearbestProducts
      } = await getPrices.formatProducts(printersData);
      getPrices.getAmazonProductPrice({ spanishProducts, mxProducts, usaProducts }, '3d-printers');
      getPrices.getAliexpressProductPrice(aliexpressProducts, '3d-printers');
      getPrices.getGearbestProductPrice(gearbestProducts, '3d-printers');
    } catch (error) {
      console.log(error);
    }
  });
}

exports.cronMaterials = (scheduleTime) => {
  cron.schedule(scheduleTime, async () => {
    try {
      /**
       * Obtenemos todos los materiales
       */
      const materialsdb = await firebase.db.ref('materials');
      const materials = await materialsdb.once('value');
      const materialsData = materials.val();
      const {
        spanishProducts,
        mxProducts,
        usaProducts,
        aliexpressProducts,
        gearbestProducts
      } = await formatProducts(materialsData);
        getPrices.getAmazonProductPrice({ spanishProducts, mxProducts, usaProducts }, 'materials');
        getPrices.getAliexpressProductPrice(aliexpressProducts, 'materials');
        getPrices.getGearbestProductPrice(gearbestProducts, 'materials');
    } catch (error) {
      console.log(error);
    }
  });
}
