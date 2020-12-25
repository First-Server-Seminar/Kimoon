const ut = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');
const jwt = require('../modules/jwt');

const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;

module.exports = {
  authorize: async (req, res) => {
    const token = req.headers.jwt;
    if (!token) {
      return res.json(ut.fail(sc.BAD_REQUEST, rm.EMPTY_TOKEN));
    }
    const user = await jwt.verify(token);
    console.log(user);
    if (user === TOKEN_EXPIRED) {
      return res.status(sc.UNAUTHORIZED).send(ut.fail(sc.UNAUTHORIZED, rm.EXPIRED_TOKEN));
    }
    if (user === TOKEN_INVALID) {
      return res.status(sc.UNAUTHORIZED).send(ut.fail(sc.UNAUTHORIZED, rm.INVALID_TOKEN));
    }
    if (user.id === undefined) {
      return res.status(sc.UNAUTHORIZED).send(ut.fail(sc.UNAUTHORIZED, rm.INVALID_TOKEN));
    }
    return res.status(sc.OK).send(ut.fail(sc.OK, rm.AUTH_SUCCESS));
  },
  reissue: async (req, res) => {
    const refreshToken = req.headers.refreshtoken;
    if (!refreshToken) {
      console.log(req.headers);
      return res.status(sc.BAD_REQUEST).send(ut.fail(sc.BAD_REQUEST, rm.EMPTY_TOKEN));
    }

    const newToken = await jwt.refresh(refreshToken);
    if (newToken == TOKEN_EXPIRED) {
      return res.status(sc.UNAUTHORIZED).send(ut.fail(sc.UNAUTHORIZED, rm.EXPIRED_TOKEN));
    }
    if (newToken == TOKEN_INVALID) {
      return res.status(sc.UNAUTHORIZED).send(ut.fail(sc.UNAUTHORIZED, rm.INVALID_TOKEN));
    }
    return res.status(sc.OK).send(ut.success(sc.OK, rm.ISSUE_SUCCESS, {accessToken: newToken}));
  }
}