const cron = require("node-cron");
const firebase = require('./app');
const getPrices = require('./utils/getPrices');



const printersdb = firebase.db.ref('3d-printers');
const printers = printersdb.once('value');
printers.then(snapshot => {
  const printersData = snapshot.val();
  printersId = Object.keys(printersData);
  let spanishProducts = [];
  let mxProducts = [];
  let usaProducts = [];
  let aliexpressProducts = [];
  let gearbestProducts = [];
  let printersElements = [];
  Object.entries(printersData).forEach(([id, value]) => {
    printersElements.push({id, ...value})
  });
  printersElements.forEach(element => {
    const {affiliateAmazonInfo: {ES, MX, US}, affiliateAliexpress, affiliateGearbestInfo, id, name: productName} = element;
    /**
     * Añadimos los productos de ES
     */
    if(ES) {
      if(ES.asin) {
        spanishProducts.push({...ES, id, productName, subproduct: false});
      } else {
        Object.values(ES).forEach(item => spanishProducts.push({...item, id, productName, subproduct: true}))
      }
    }
    /**
     * Añadimos los productos de MX
     */
    if(MX) {
      if(MX.asin) {
        mxProducts.push({...MX, id, productName, subproduct: false});
      } else {
        Object.values(MX).forEach(item => mxProducts.push({...item, id, productName, subproduct: true}))
      }
    }
    /**
     * Añadimos los productos de US
     */
    if(US) {
      if(US.asin) {
        usaProducts.push({...US, id, productName, subproduct: false});
      } else {
        Object.values(US).forEach(item => usaProducts.push({...item, id, productName, subproduct: true}))
      }
    }
    /**
     * Añadimos los productos de aliexpress
     */
    if(affiliateAliexpress) {
      if(affiliateAliexpress.asin) {
        aliexpressProducts.push({...affiliateAliexpress, id, productName, subproduct: false});
      } else {
        Object.values(affiliateAliexpress).forEach(item => aliexpressProducts.push({...item, id, productName, subproduct: true}))
      }
    }
    /**
     * Añadimos los productos de Gearbest
     */
    if(affiliateGearbestInfo) {
      if(affiliateGearbestInfo.asin) {
        gearbestProducts.push({...affiliateGearbestInfo, id, productName, subproduct: false});
      } else {
        Object.values(affiliateGearbestInfo).forEach(item => gearbestProducts.push({...item, id, productName, subproduct: true}))
      }
    }
  });
  getPrices.getAmazonProductPrice({spanishProducts, mxProducts, usaProducts}, '3d-printers');
  getPrices.getAliexpressProductPrice(aliexpressProducts, '3d-printers');
  getPrices.getGearbestProductPrice(gearbestProducts, '3d-printers');
});


exports.cronPrinters = (scheduleTime) => {
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
      });
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
      materialsId = Object.keys(materialsData);
      materialsId.forEach(item => {
        getPrices.getAmazonProductPrice(materialsData[item], item, 'materials');
        getPrices.getAliexpressProductPrice(materialsData[item], item, 'materials');
        getPrices.getGearbestProductPrice(materialsData[item], item, 'materials');
      });
    } catch (error) {
      console.log(error);
    }
  });
}
