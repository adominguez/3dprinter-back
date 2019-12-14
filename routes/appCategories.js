const firebase = require('../app');
const _ = require('lodash');
const authenticationToken = require('../authenticationToken');


exports.getCategories = (app) => {

  // GET /categories
  app.get('/categories/', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    if (authenticationToken.checkAuthenticationToken(req.query.authentication)) {
      firebase.db.ref('categories')
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

  // GET /categories/productType
  app.get('/categories/:productType', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    const productType = req.params.productType;
    if (authenticationToken.checkAuthenticationToken(req.query.authentication)) {
      firebase.db.ref('categories')
        .once('value')
        .then(snapshot => { res.json(_.map(snapshot.val(), (item, id) => ({ ...item, id })).filter(category => category.productType === productType)) })
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

  // GET /category/:id
  app.get('/category/:id', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    const categoryId = req.params.id;
    if (authenticationToken.checkAuthenticationToken(req.query.authentication)) {
      firebase.db.ref('categories')
        .child(categoryId)
        .once("value")
        .then(snapshot => res.json(snapshot.val()))
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

  // TODO POST /add-new-category
  app.get('/add-new-category', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    if (authenticationToken.checkAuthenticationToken(req.query.authentication)) {
      firebase.db.ref('categories')
        .push(req.query)
        .then(() => res.json({
          error: false,
          status: 'ok',
          code: 200,
          message: 'new category added'
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
   * UPDATE /update-category/:id
   */
  app.get('/update-category/:id', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    const categoryId = req.params.id;
    if (authenticationToken.checkAuthenticationToken(req.query.authentication)) {
      firebase.db.ref('categories')
        .child(categoryId)
        .update({ 'categoryDescription': 'profesional' })
        .then(() => res.json({
          error: false,
          status: 'ok',
          code: 200,
          message: 'updated category'
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
   * REMOVE /delete-category/:id
   */
  app.get('/delete-category/:id', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    const categoryId = req.params.id;
    if (authenticationToken.checkAuthenticationToken(req.query.authentication)) {
      firebase.db.ref('categories')
        .child(categoryId)
        .remove()
        .then(() => res.json({
          error: false,
          status: 'ok',
          code: 200,
          message: 'deleted category'
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
}
