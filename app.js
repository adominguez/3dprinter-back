var admin = require("firebase-admin");

const firebaseData = {
  "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
}

admin.initializeApp({
  credential: admin.credential.cert(firebaseData),
  databaseURL: "https://project-3dmakernow.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
exports.db = admin.database();
