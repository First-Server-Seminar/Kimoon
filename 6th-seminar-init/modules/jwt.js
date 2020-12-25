const jwt = require('jsonwebtoken');
const { secretKey, options, refreshOptions } = require('../config/secretKey');
const userService = require('../service/userService');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
  sign: async (user) => {
    const payload = {
      id: user.id,
      name: user.userName
    };
    const result = {
      accessToken: jwt.sign(payload, secretKey, options),
      refreshToken: jwt.sign(payload, secretKey, refreshOptions),
    };
    return result;
  },
  verify: async (token) => {
    let decoded;
    try {
      decoded = jwt.verify(token, secretKey);
    } catch (err) {
      if (err.message === 'jwt expired') {
        console.log('expired token');
        return TOKEN_EXPIRED;
      } else if (err.message === 'invalid token') {
        console.log('invalid token');
        console.log(TOKEN_INVALID);
        return TOKEN_INVALID;
      } else {
        console.log("invalid token");
        return TOKEN_INVALID;
      }
    }
    return decoded;
  },
  refresh: async (refreshToken) => {
    try {
      const result = await jwt.verify(refreshToken, secretKey);
      if (result === undefined) { // decode 불가
        return TOKEN_INVALID;
      }

      const user = await userService.getUserById(result.id);
      if (user.refreshToken !== refreshToken) {
        console.log('Invalid refresh token'); // DB에 저장된 리프레쉬 토큰과 일치하지 않음
        return TOKEN_INVALID;
      }
      const payload = {
        id: user.id,
        name: user.userName
      };
      const accessToken = jwt.sign(payload, secretKey, options);  // 재발급
      return accessToken;
    } catch (err) {
      if (err.message === 'jwt expired') {
        console.log('expired token');
        return TOKEN_EXPIRED;
      } else if (err.message === 'invalid token') {
        console.log('invalid token');
        console.log(TOKEN_INVALID);
        return TOKEN_INVALID;
      } else {
        console.log("invalid token");
        return TOKEN_INVALID;
      }
    }
  }
}