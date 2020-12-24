const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const { Post } = require('../models');

module.exports = {
  single: async (req, res) => {
    const { title, contents } = req.body;
    const imageUrl = req.file.location;

    if (!title || !contents || !imageUrl) {
      return res.status(statusCode.BAD_REQUEST).send(util.success(statusCode.BAD_REQUEST, responseMessage.CREATE_POST_FAIL));
    }
    console.log(req.file);
    console.log(req.body);
    
    try {
      const post = await Post.create({
        title,
        contents,
        postImageUrl: imageUrl
      });
  
      return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.CREATE_POST_SUCCESS, post));
    } catch (error) {
      console.log(error);
      return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.CREATE_POST_FAIL));
    }
  }
}