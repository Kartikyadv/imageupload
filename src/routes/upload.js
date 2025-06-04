const express = require('express');
const multer = require('multer');
const { uploadImages, uploadFiles } = require('../controller/uploadController');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/images', upload.array('images'), uploadImages);
router.post('/files', upload.array('files'), uploadFiles);

module.exports = router; 