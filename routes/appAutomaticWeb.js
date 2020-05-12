const firebase = require('../app');

exports.getAutomaticWeb = (app) => {

  // GET /printers
  app.get('/automatic-web', function (req, res) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    firebase.db.ref('automatic-web')
      .once('value')
      .then(snapshot => res.json(snapshot.val()))
      .catch(error => (res.json({
        errorCode: error.code,
        errorMessage: error.message
      })));
  });
}
