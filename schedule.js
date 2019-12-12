const cron = require("node-cron");
const firebase = require('./app');
const _ = require('lodash');

exports.cron = (scheduleTime) => {
    // cron.schedule(scheduleTime, () => {
        firebase.db.ref('3d-printers').on('value', (snapshot) => {
            const dbPrinters = snapshot.val();
            const printers = _.map(dbPrinters, item => item);
        });
    // });
}