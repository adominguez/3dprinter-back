const firebase = require('../app');
const _ = require('lodash');

exports.getPrinters = (app) => {

    // GET /printers
    app.get('/printers', function (req, res) {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
        res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
        firebase.db.ref('3d-printers')
            .once('value')
            .then(snapshot => res.json(_.map(snapshot.val(), (item, id) => ({...item, id}))))
            .catch(error => (res.json({
                errorCode: error.code,
                errorMessage: error.message
            })));
    });

    // GET /printers/category
    app.get('/printers/:category', function (req, res) {
        const category = req.params.category;
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
        res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
        firebase.db.ref('3d-printers')
            .once('value')
            .then(snapshot => {res.json(_.map(snapshot.val(), (item, id) => ({...item, id})).filter(printer => printer.category === category))})
            .catch(error => (res.json({
                errorCode: error.code,
                errorMessage: error.message
            })));
    });

    // GET /printers/category/table
    app.get('/printers/:category/table', function (req, res) {
        const category = req.params.category;
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
        res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
        firebase.db.ref('3d-printers')
            .once('value')
            .then(snapshot => {res.json({"data" : _.map(snapshot.val(), (item, id) => ({...item, id})).filter(printer => printer.category === category)})})
            .catch(error => (res.json({
                errorCode: error.code,
                errorMessage: error.message
            })));
    });

    // GET /printer/:id
    app.get('/printer/:id', function (req, res) {
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

    // TODO POST /printer/:id using firebase.db.ref('3d-printers).push({data})
    /*app.post('/add-new-printer', function (req, res) {
        const { name,  } = req.body;
        const printerId = req.params.id;
        firebase.db.ref('3d-printers')
            .child(printerId)
            .once("value")
            .then(snapshot => res.json(snapshot.val()))
            .catch(error => (res.json({
                errorCode: error.code,
                errorMessage: error.message
            })));
    });*/

    /**
     * UPDATE /printer/:id
     */
    app.put('/update-printer/:id', function (req, res) {
        const printerId = req.params.id;
        firebase.db.ref('3d-printers')
            .child(printerId)
            .update({'category': 'profesional'})
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
     * REMOVE /printer/:id
     */
    app.delete('/remove-printer/:id', function (req, res) {
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