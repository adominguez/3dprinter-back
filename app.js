var admin = require("firebase-admin");

var serviceAccount = require("./project-3dmakernow-firebase-adminsdk-y6rgc-3997ce706a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-3dmakernow.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
exports.db = admin.database();