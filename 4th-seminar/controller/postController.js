const { User, Post, Like } = require('../models');
const ut = require('../modules/util');
const sc = require('../modules/statusCode');
const rm = require('../modules/responseMessage');

module.exports = {
	createPost: async(req, res) => {
		const { title, contents, userId } = req.body;
		try{
			// const user = await User.findOne({id:userId});
			const post = await Post.create({title, contents, UserId: userId });
			return res.status(sc.OK).send(ut.success(sc.OK, rm.CREATE_POST_SUCCESS, post));
		} catch(err) {
			console.log(err);
			return res.status(sc.INTERNAL_SERVER_ERROR)
			.send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.CREATE_POST_FAIL));
		}
	},
	readPosts: async(req, res) => {
		try{
			const posts = await Post.findAll({
				include:[{
					model: User,
					attributes: ['email', 'userName']
				},{
					model: User,
					as: 'Liker',
					attributes: { exclude: ['password', 'salt']}
				}]
			});
			return res.status(sc.OK)
			.send(ut.success(sc.OK, "전체 게시글 조회 성공", posts));
		} catch(err){
			console.log(err);
			return res.status(sc.INTERNAL_SERVER_ERROR)
			.send(ut.fail(sc.INTERNAL_SERVER_ERROR, "전체 게시글 조회 실패"));
		}

	},
	createLike: async(req, res) => {
		const PostId = req.params.postId;
		const UserId = req.body.userId;
		try{
			const like = await Like.create({UserId, PostId});
			return res.status(sc.OK).send(ut.success, "좋아요 생성", like);
		}catch(err){
			console.log(err);
			return res.status(sc.INTERNAL_SERVER_ERROR).send(ut.fail(sc.INTERNAL_SERVER_ERROR, "좋아요 실패"));
		}
	}
}