const express = require('express');
const multerController = require('../../controller/multerController');
const router = express.Router();
const upload = require('../../modules/multer');

router.post('/single', upload.single('image'), multerController.single);

router.post('/array', upload.array('images', 3), async (req, res) => {
  const imageUrls = req.files.map(file => file.location);
  console.log(req.files);
  console.log(req.body);
  res.send({
    imageUrls: imageUrls,
    file: req.files,
    body: req.body
  });
});

module.exports = router;
