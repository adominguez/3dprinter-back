const firebase = require('../app');
const _ = require('lodash');
const authenticationToken = require('../authenticationToken');
const sendEmail = require('../utils/sendEmail');
const getPrices = require('../utils/getPrices');

exports.getMaterials = (app) => {

  // GET /materials
  app.get('/materials', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    if (authenticationToken.checkAuthenticationToken(req.query.authentication)) {
      firebase.db.ref('materials')
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

  // GET /materials/category get materials by category
  app.get('/materials/:category', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    const category = req.params.category;
    const { country } = req.query;
    if (authenticationToken.checkAuthenticationToken(req.query.authentication)) {
      firebase.db.ref('materials')
        .once('value')
        .then(snapshot => {
          const materials = _.map(snapshot.val(), (item, id) => ({ ...item, id })).filter(material => material.category === category);
          if(country) {
            const materialsFiltered = materials.filter(item => item.affiliateAmazonInfo[country]).map(material => {
              const colors = material.materialFeatures.colors.filter(color => color.affiliateAmazonInfo && color.affiliateAmazonInfo[country]).map(affiliate => (
                {
                  color: affiliate.color,
                  colorName: affiliate.colorName,
                  affiliateLink: affiliate.affiliateAmazonInfo[country].affiliateShortLink
                }
              ));
              return {
                ...material,
                affiliateAmazonInfo: material.affiliateAmazonInfo[country],
                materialFeatures: {
                  ...material.materialFeatures,
                  colors
                }
              }
            });
            return res.json(materialsFiltered);
          }
          return res.json(materials);
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

  // GET /materials/category/table
  app.get('/materials/:category/table', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    const category = req.params.category;
    if (authenticationToken.checkAuthenticationToken(req.query.authentication)) {
      firebase.db.ref('materials')
        .once('value')
        .then(snapshot => { res.json({ "data": _.map(snapshot.val(), (item, id) => ({ ...item, id })).filter(material => material.category === category) }) })
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

  // GET /material/:id
  app.get('/material/:id', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    const material = req.params.id;
    const { authentication, affiliateInfo, featuresInfo, examplesInfo, reviewsInfo, country  } = req.query;
    if (authenticationToken.checkAuthenticationToken(authentication)) {
      firebase.db.ref('materials')
        .child(material)
        .once('value')
        .then(snapshot => {
          const { materialFeatures, socialCommunity, materialExamples, reviews, ...rest } = snapshot.val();
          if(affiliateInfo) {
            const {amazonInfo, aliexpressInfo, gearbestInfo} = getPrices.formatAffiliateInfo(rest, country);
            return country ? res.json({ ...rest, ...amazonInfo, ...aliexpressInfo, ...gearbestInfo }) : res.json({ ...rest });
          }
          if(featuresInfo) {
            return res.json({ materialFeatures });
          }
          if(reviewsInfo) {
            return res.json({ reviews });
          }
          if(examplesInfo) {
            return res.json({ materialExamples });
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

  // POST /add-new-material
  app.post('/add-new-material', function (req, res) {
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
      firebase.db.ref('materials')
        .push(data)
        .then(() => res.json({
          error: false,
          status: 'ok',
          code: 200,
          message: 'new material has been added'
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
   * POST update /material/:id
   */
  app.post('/update-material/:id', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    const materialId = req.params.id;
    const data = {
      ...req.body,
      updateDate: `${new Date()}`
    }
    if (authenticationToken.checkAuthenticationToken(req.query.authentication)) {
      firebase.db.ref('materials')
        .child(materialId)
        .update(data)
        .then(() => res.json({
          error: false,
          status: 'ok',
          code: 200,
          message: 'The material has been udpated sucessfull'
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
   * GET update automatically price /material/:id
   */
  /*app.get('/update-automatically-printer/:id', function (req, res) {
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
  });*/

  /**
   * GET delete /material/:id
   */
  app.get('/delete-material/:id', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    const materialId = req.params.id;
    if (authenticationToken.checkAuthenticationToken(req.query.authentication)) {
      firebase.db.ref('materials')
        .child(materialId)
        .remove()
        .then(() => res.json({
          error: false,
          status: 'ok',
          code: 200,
          message: 'The material has been deleted sucessfull'
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
  app.get('/material-error-notification/:id', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    const materialId = req.params.id;
    sendEmail.errorFromWeb(materialId);
    if (authenticationToken.checkAuthenticationToken(req.query.authentication)) {
      email.sendEmail(data);
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
