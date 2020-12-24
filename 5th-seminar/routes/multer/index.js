const express = require('express');
const multerController = require('../../controller/multerController');
const router = express.Router();
const upload = require('../../modules/multer');

router.post('/single', upload.single('image'), multerController.single);

router.post('/array', upload.array('images', 3), multerController.array);

module.exports = router;
