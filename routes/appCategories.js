const firebase = require('../app');
const _ = require('lodash');

exports.getCategories = (app) => {

  // GET /categories
  app.get('/categories', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    firebase.db.ref('3d-printers')
      .once('value')
      .then(snapshot => res.json(_.map(snapshot.val(), (item, id) => ({ ...item, id }))))
      .catch(error => (res.json({
        errorCode: error.code,
        errorMessage: error.message
      })));
  });

  // GET /categories/category
  app.get('/categories/:category', function (req, res) {
    const category = req.params.category;
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    firebase.db.ref('3d-printers')
      .once('value')
      .then(snapshot => { res.json(_.map(snapshot.val(), (item, id) => ({ ...item, id })).filter(printer => printer.category === category)) })
      .catch(error => (res.json({
        errorCode: error.code,
        errorMessage: error.message
      })));
  });

  // GET /category/:id
  app.get('/category/:id', function (req, res) {
    const printerId = req.params.id;
    firebase.db.ref('3d-printers')
      .child(printerId)
      .once("value")
      .then(snapshot => res.json(snapshot.val()))
      .catch(error => (res.json({
        errorCode: error.code,
        errorMessage: error.message
      })));
  });

  // TODO POST /add-new-category
  app.get('/add-new-category', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    firebase.db.ref('categories')
      .push(req.query)
      .then(() => res.send(200));
  });

  /**
   * UPDATE /update-category/:id
   */
  app.put('/update-category/:id', function (req, res) {
    const printerId = req.params.id;
    firebase.db.ref('3d-printers')
      .child(printerId)
      .update({ 'category': 'profesional' })
      .then(() => res.json({
        error: false,
        status: 'ok',
        code: 200,
        message: 'updated printer'
      }))
      .catch(error => (res.json({
        errorCode: error.code,
        errorMessage: error.message
      })));
  });

  /**
   * REMOVE /remove-category/:id
   */
  app.delete('/remove-category/:id', function (req, res) {
    const printerId = req.params.id;
    firebase.db.ref('3d-printers')
      .child(printerId)
      .remove()
      .then(() => res.json({
        error: false,
        status: 'ok',
        code: 200,
        message: 'deleted printer'
      }))
      .catch(error => (res.json({
        errorCode: error.code,
        errorMessage: error.message
      })));
  });
}
