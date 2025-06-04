const AWS = require('aws-sdk');

const spacesEndpoint = new AWS.Endpoint(process.env.DO_SPACE_ENDPOINT);
const s3Image = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_SPACE_ACCESS_KEY_IMAGES,
  secretAccessKey: process.env.DO_SPACE_SECRET_KEY_IMAGES,
});

const s3File = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DO_SPACE_ACCESS_KEY_FILES,
  secretAccessKey: process.env.DO_SPACE_SECRET_KEY_FILES,
});

module.exports = {s3File, s3Image};
