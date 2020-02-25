const cron = require("node-cron");
const firebase = require('./app');
const getPrices = require('./utils/getPrices');

exports.cron = (scheduleTime) => {
  cron.schedule(scheduleTime, () => {
    return firebase.db.ref('3d-printers').once('value').then(snapshot => {
      snapshot.forEach(childSnapshot => {
        const {key} = childSnapshot;
        getPrices.getAmazonProductPrice(key)
        getPrices.getAliexpressProductPrice(key)
        getPrices.getGearbestProductPrice(key);
      });
    }, error => {
      // The Promise was rejected.
      console.error(error);
    }).then(values => {
      console.log(values); // [snap, snap, snap]
    });
  });
}
