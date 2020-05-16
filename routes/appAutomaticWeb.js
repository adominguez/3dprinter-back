const firebase = require('../app');
const getModels = require('../utils/getModels');

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

  // GET /word
  app.get('/search/:word', async (req, res) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept');
    const { word } = req.params;

    const thingiverseModels = await getModels.getThingiverseModels(word);
    const cultsModels = await getModels.getCultsModels(word);
    const grabCadModels = await getModels.getGrabCadsModels(word);
    const free3DModels = await getModels.getFree3D(word);
    // const pinshapesModels = await getModels.getPinshapeModels(word);
    const sketchFabModels = await getModels.getSketchFab(word);

    totalModels = thingiverseModels.length + cultsModels.length + grabCadModels.length + free3DModels.length + sketchFabModels.length;

    res.json({totalModels ,models:[...thingiverseModels, ...cultsModels, ...grabCadModels, ...free3DModels, ...sketchFabModels]});
  });
}
