const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const bucketName = 'nusantastybucket';
const bucket = storage.bucket(bucketName);

module.exports = {bucket, bucketName};
