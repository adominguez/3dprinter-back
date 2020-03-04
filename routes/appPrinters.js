const firebase = require('../app');
const _ = require('lodash');
const authenticationToken = require('../authenticationToken');
const sendEmail = require('../utils/sendEmail');
const getPrices = require('../utils/getPrices');

exports.getPrinters = (app) => {

  // GET /printers
  app.get('/printers', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    if (authenticationToken.checkAuthenticationToken(req.query.authentication)) {
      firebase.db.ref('3d-printers')
        .once('value')
        .then(snapshot => res.json(_.map(snapshot.val(), (item, id) => ({ ...item, id }))))
        .catch(error => (res.json({
          errorCode: error.code,
          errorMessage: error.message
        })));
    } else {
      return res.json({
        errorCode: 401,
        errorMessage: 'No tienes permisos para ver esta información'
      })
    }
  });

  // GET /printers/category get printers by category
  app.get('/printers/:category', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    const category = req.params.category;
    if (authenticationToken.checkAuthenticationToken(req.query.authentication)) {
      firebase.db.ref('3d-printers')
        .once('value')
        .then(snapshot => { res.json(_.map(snapshot.val(), (item, id) => ({ ...item, id })).filter(printer => printer.category === category)) })
        .catch(error => (res.json({
          errorCode: error.code,
          errorMessage: error.message
        })));
    } else {
      return res.json({
        errorCode: 401,
        errorMessage: 'No tienes permisos para ver esta información'
      })
    }
  });

  // GET /printers/category/table
  app.get('/printers/:category/table', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    const category = req.params.category;
    if (authenticationToken.checkAuthenticationToken(req.query.authentication)) {
      firebase.db.ref('3d-printers')
        .once('value')
        .then(snapshot => { res.json({ "data": _.map(snapshot.val(), (item, id) => ({ ...item, id })).filter(printer => printer.category === category) }) })
        .catch(error => (res.json({
          errorCode: error.code,
          errorMessage: error.message
        })));
    } else {
      return res.json({
        errorCode: 401,
        errorMessage: 'No tienes permisos para ver esta información'
      })
    }
  });

  // GET /printer/:id
  app.get('/printer/:id', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    const printerId = req.params.id;
    const { authentication, affiliateInfo, featuresInfo, socialInfo, printFeaturesInfo, reviewsInfo, country  } = req.query;
    if (authenticationToken.checkAuthenticationToken(authentication)) {
      firebase.db.ref('3d-printers')
        .child(printerId)
        .once('value')
        .then(snapshot => {
          const { printFeatures, printerElectricity, printerParameters, printerSoftware, printerUnboxing, socialCommunity, toPrintFeatures, reviews, ...rest } = snapshot.val();
          if(affiliateInfo) {
            const {affiliateAmazonInfo} = rest;
            return country ? res.json({ ...rest, affiliateAmazonInfo: {...affiliateAmazonInfo[country]} }) : res.json({ ...rest });
          }
          if(featuresInfo) {
            return res.json({ printFeatures, printerElectricity, printerParameters, printerSoftware, printerUnboxing });
          }
          if(socialInfo) {
            return res.json({ socialCommunity });
          }
          if(printFeaturesInfo) {
            return res.json({ toPrintFeatures });
          }
          if(reviewsInfo) {
            return res.json({ reviews });
          }
          return res.json(snapshot.val());
        })
        .catch(error => (res.json({
          errorCode: error.code,
          errorMessage: error.message
        })));
    } else {
      return res.json({
        errorCode: 401,
        errorMessage: 'No tienes permisos para ver esta información'
      })
    }
  });

  // POST /add-new-printer
  app.post('/add-new-printer', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    const { authentication } = req.query;
    const data = {
      ...req.body,
      updateDate: `${new Date()}`,
      creationDate: `${new Date()}`
    }
    if (authenticationToken.checkAuthenticationToken(authentication)) {
      firebase.db.ref('3d-printers')
        .push(data)
        .then(() => res.json({
          error: false,
          status: 'ok',
          code: 200,
          message: 'new printer has been added'
        }))
        .catch(error => (res.json({
          errorCode: error.code,
          errorMessage: error.message
        })));
    } else {
      return res.json({
        errorCode: 401,
        errorMessage: 'No tienes permisos para ver esta información'
      })
    }
  });

  /**
   * POST update /printer/:id
   */
  app.post('/update-printer/:id', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    const printerId = req.params.id;
    const data = {
      ...req.body,
      updateDate: `${new Date()}`
    }
    if (authenticationToken.checkAuthenticationToken(req.query.authentication)) {
      firebase.db.ref('3d-printers')
        .child(printerId)
        .update(data)
        .then(() => res.json({
          error: false,
          status: 'ok',
          code: 200,
          message: 'The printer has been udpated sucessfull'
        }))
        .catch(error => (res.json({
          errorCode: error.code,
          errorMessage: error.message
        })));
    } else {
      return res.json({
        errorCode: 401,
        errorMessage: 'No tienes permisos para ver esta información'
      })
    }
  });

  /**
   * POST update /add-printer-review/:id
   */
  app.get('/add-printer-review/:id', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    const printerId = req.params.id;
    const data = {
      enabled: false,
      name: req.query.name !== '' ? req.query.name : 'Anonimo',
      try: req.query.try,
      review: req.query.review
    }
    if (authenticationToken.checkAuthenticationToken(req.query.authentication)) {
      firebase.db.ref('3d-printers')
        .child(printerId)
        .child('reviews')
        .push(data)
        .then(snap =>{
          const review = snap.key
          sendEmail.newPrinterReview(printerId, review, data);
          return res.json({
            error: false,
            status: 'ok',
            code: 200,
            message: 'The printer has been udpated sucessfull'
          })
        })
        .catch(error => (res.json({
          errorCode: error.code,
          errorMessage: error.message
        })));
    } else {
      return res.json({
        errorCode: 401,
        errorMessage: 'No tienes permisos para ver esta información'
      })
    }
  });

  /**
   * POST update /add-printer-review/:id
   */
  app.get('/accept-printer-review/:id/:reviewId', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    const printerId = req.params.id;
    const reviewId = req.params.reviewId;
    const data = {
      ...req.body,
      enabled: true,
    }
    if (authenticationToken.checkAuthenticationToken(req.query.authentication)) {
      firebase.db.ref('3d-printers')
        .child(printerId)
        .child('reviews')
        .child(reviewId)
        .update(data)
        .then(() =>{
          return res.json({
            error: false,
            status: 'ok',
            code: 200,
            message: 'The printer has been udpated sucessfull'
          })
        })
        .catch(error => (res.json({
          errorCode: error.code,
          errorMessage: error.message
        })));
    } else {
      return res.json({
        errorCode: 401,
        errorMessage: 'No tienes permisos para ver esta información'
      })
    }
  });

  /**
   * GET update automatically price /printer/:id
   */
  app.get('/update-automatically-printer/:id', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    const printerId = req.params.id;

    if (authenticationToken.checkAuthenticationToken(req.query.authentication)) {

      getPrices.getAmazonProductPrice(printerId)
      getPrices.getAliexpressProductPrice(printerId)
      getPrices.getGearbestProductPrice(printerId);
      return res.json({
        error: false,
        status: 'ok',
        code: 200,
        message: 'The printer has been udpated sucessfull'
      })
    } else {
      return res.json({
        errorCode: 401,
        errorMessage: 'No tienes permisos para ver esta información'
      })
    }
  });

  /**
   * GET delete /printer/:id
   */
  app.get('/delete-printer/:id', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    const printerId = req.params.id;
    if (authenticationToken.checkAuthenticationToken(req.query.authentication)) {
      firebase.db.ref('3d-printers')
        .child(printerId)
        .remove()
        .then(() => res.json({
          error: false,
          status: 'ok',
          code: 200,
          message: 'The printer has been deleted sucessfull'
        }))
        .catch(error => (res.json({
          errorCode: error.code,
          errorMessage: error.message
        })));
    } else {
      return res.json({
        errorCode: 401,
        errorMessage: 'No tienes permisos para ver esta información'
      })
    }
  });

  /**
   * GET send Email with error notification
   */
  app.get('/error-notification/:id', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    const printerId = req.params.id;
    if (authenticationToken.checkAuthenticationToken(req.query.authentication)) {
      sendEmail.errorFromWeb(printerId);
      return res.json({
        error: false,
        status: 'ok',
        code: 200,
        errorMessage: 'The error has been sent ok'
      })
    } else {
      return res.json({
        errorCode: 401,
        errorMessage: 'No tienes permisos para ver esta información'
      })
    }
  });

}
