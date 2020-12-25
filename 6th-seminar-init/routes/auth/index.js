const express = require('express');
const router = express.Router();
const ut = require('../../modules/util');
const sc = require('../../modules/statusCode');
const rm = require('../../modules/responseMessage');
const jwt = require('../../modules/jwt');
const authController = require('../../controller/authController');
const TOKEN_EXPIRED = -3
const TOKEN_INVALID = -2

router.get('/', authController.authorize);
router.get('/reissue', authController.reissue);

module.exports = router;