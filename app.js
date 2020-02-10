var admin = require("firebase-admin");

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

admin.initializeApp({
  credential: admin.credential.cert(firebaseData),
  databaseURL: "https://project-3dmakernow.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
exports.db = admin.database();
