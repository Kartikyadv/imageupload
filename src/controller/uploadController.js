const sharp = require('sharp');
const {s3Image, s3File} = require('../utils/s3Client');

exports.uploadImages = async (req, res) => {
  try {
    const { path } = req.query;
    const files = req.files;

    if (!path || !files || files.length === 0) {
      return res.status(400).json({ error: 'Missing path or image files.' });
    }

    const MAX_FILE_SIZE = 3 * 1024 * 1024;
    const oversizedFiles = files.filter(file => file.size > MAX_FILE_SIZE);
    
    if (oversizedFiles.length > 0) {
      return res.status(413).json({ 
        error: 'File too large', 
        message: 'One or more images exceed the maximum size limit of 3MB'
      });
    }

    const uploadResults = [];

    for (const file of files) {
      const fileName = `${Date.now()}-${file.originalname}`;
      const uploadPath = `${path}/${fileName}`.replace(/^\/+/, '');
      const thumbnailPath = `copy${path}/${fileName}`.replace(/^\/+/, '');

      // Upload original image
      await s3Image.putObject({
        Bucket: process.env.DO_SPACE_NAME_IMAGES,
        Key: uploadPath,
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype,
      }).promise();

      // Generate and upload thumbnail
      const resizedBuffer = await sharp(file.buffer)
        .resize(200)
        .jpeg({ quality: 60 })
        .toBuffer();

      await s3Image.putObject({
        Bucket: process.env.DO_SPACE_NAME_IMAGES,
        Key: thumbnailPath,
        Body: resizedBuffer,
        ACL: 'public-read',
        ContentType: 'image/jpeg',
      }).promise();

      uploadResults.push({
        original: `${process.env.DO_SPACE_CND_URL_PREFIX_IMAGES}/${encodeURI(uploadPath)}`,
        thumbnail: `${process.env.DO_SPACE_CND_URL_PREFIX_IMAGES}/${encodeURI(thumbnailPath)}`
      });
    }

    res.status(200).json({ success: true, uploaded: uploadResults });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed', message: err.message });
  }
};

exports.uploadFiles = async (req, res) => {
  try {
    const { path } = req.query;
    const files = req.files;

    if (!path || !files || files.length === 0) {
      return res.status(400).json({ error: 'Missing path or files.' });
    }

    const uploadResults = [];

    for (const file of files) {
      const fileName = `${Date.now()}-${file.originalname}`;
      const uploadPath = `${path}/${fileName}`.replace(/^\/+/, '');

      await s3File.putObject({
        Bucket: process.env.DO_SPACE_NAME_FILES,
        Key: uploadPath,
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype,
      }).promise();

      uploadResults.push({
        file: `${process.env.DO_SPACE_CND_URL_PREFIX_FILES}/${encodeURI(uploadPath)}`
      });
    }

    res.status(200).json({ success: true, uploaded: uploadResults });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed', message: err.message });
  }
};