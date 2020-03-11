const cron = require("node-cron");
const firebase = require('./app');
const getPrices = require('./utils/getPrices');

exports.cron = (scheduleTime) => {
  cron.schedule(scheduleTime, async () => {
    try {
      /**
       * Obtenemos todas las impresoras
       */
      const printersdb = await firebase.db.ref('3d-printers');
      const printers = await printersdb.once('value');
      const printersData = printers.val();
      printersId = Object.keys(printersData);
      printersId.forEach(item => {
        getPrices.getAmazonProductPrice(printersData[item], item, '3d-printers');
        getPrices.getAliexpressProductPrice(printersData[item], item, '3d-printers');
        getPrices.getGearbestProductPrice(printersData[item], item, '3d-printers');
      })
      /**
       * Obtenemos todos los materiales
       */
      const materialsdb = await firebase.db.ref('materials');
      const materials = await materialsdb.once('value');
      const materialsData = materials.val();
      materialsId = Object.keys(materialsData);
      materialsId.forEach(item => {
        getPrices.getAmazonProductPrice(materialsData[item], item, 'materials');
        getPrices.getAliexpressProductPrice(materialsData[item], item, 'materials');
        getPrices.getGearbestProductPrice(materialsData[item], item, 'materials');
      })
    } catch (error) {
      console.log(error);
    }
  });
}
