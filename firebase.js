const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json');



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://teste-definitivo-a22b1.appspot.com'
});


const bucket = admin.storage().bucket();
module.exports = bucket;