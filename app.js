var admin = require("firebase-admin");
const firebaseDatabaseURL = process.env.FIREBASE_DATABASE_URL;
const firebaseData = {
  "type": "service_account",
  "project_id": process.env.FIREBASE_PROJECT_ID,
  "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
  "private_key": process.env.FIREBASE_PRIVATE_KEY,
  "client_email": process.env.FIREBASE_CLIENT_EMAIL,
  "client_id": process.env.FIREBASE_CLIENT_ID,
  "auth_uri": process.env.FIREBASE_AUTH_URI,
  "token_uri": process.env.FIREBASE_TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER,
  "client_x509_cert_url": process.env.FIREBASE_CERT_URL,
}
var serviceAccount = require("./project-3dmakernow-firebase-adminsdk-y6rgc-cfa2d0f106.json" || firebaseData);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-3dmakernow.firebaseio.com" || firebaseDatabaseURL
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
exports.db = admin.database();
