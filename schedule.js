const cron = require("node-cron");
const firebase = require('./app');
const getPrices = require('./utils/getPrices');

exports.cron = (scheduleTime) => {
  cron.schedule(scheduleTime, async () => {
    try {
      const node = await firebase.db.ref('3d-printers');
      const data = await node.once('value');
      const printersData = data.val();
      printersId = Object.keys(printersData)
      printersId.forEach(item => {
        getPrices.getAmazonProductPrice(printersData[item], item)
        getPrices.getAliexpressProductPrice(printersData[item], item)
        getPrices.getGearbestProductPrice(printersData[item], item);
      })
    } catch (error) {
      console.log(error);
    }
  });
}
