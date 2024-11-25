const admin = require('firebase-admin');
const serviceAccount = require('./nusantasty-id-firebase-adminsdk-9b6f7-f8866901ad.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
