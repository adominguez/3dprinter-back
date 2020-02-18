const cron = require("node-cron");
const firebase = require('./app');
const fetch = require('node-fetch');
const sendEmail = require('./utils/sendEmail');

exports.cron = (scheduleTime) => {
  cron.schedule(scheduleTime, () => {
    firebase.db.ref('3d-printers').on('value', (snapshot) => {
      const dbPrinters = snapshot.val();
      const printers = Object.keys(dbPrinters).map(key => ({ key, ...dbPrinters[key] }));
      printers.forEach(item => {
        const { key, name } = item;
        fetch(`https://api-3dmakernow.herokuapp.com/update-automatically-printer/${key}?authentication=3DMAKERNOW`)
          .then(response => response.json())
          .then(() => {
              console.log(`La impresora ${name} con id ${key} se ha actualizado correctamente`);
            })
          .catch(error => {
            sendEmail.responsePrinterError(name, key, error)
            return console.error(error);
          });
      });
    });
  });
}
