const express = require('express');
const router = express.Router();
const util = require('../../modules/util');
const responseMessage = require('../../modules/responseMessage');
const statusCode = require('../../modules/statusCode');
let membersDB = require('../../modules/members');
/** 멤버를 생성 */
router.post('/', (req, res) => {
	const { name, part, age } = req.body;	// 변수에 다중 할당, JSON 객체가 POST로 넘어왔다고 가정.

	if(!name || !part || !age){	// 누락된 값이 있다면
		console.log('필요한 값이 없습니다!');
		return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
	}
	const idx = membersDB[membersDB.length - 1].idx + 1;	// member.js의 membersDB array에서 마지막 요소의 idx보다 1 높은 값을 할당한다.
	membersDB.push({
		idx: idx,
		name: name,
		part: part,
		age: age
	})
	// status뒤에 오는 코드는 헤더에 붙고, util.success 뒤에 붙는 건 바디에 보내는 부가 정보. 바디에 붙는 건 없어도 되지만 편하라고 보낸다.
	return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_CREATE_SUCCESS, membersDB));
});
/** 모든 멤버 조회 */
router.get('/', (req, res) => {
	const members = membersDB;
	return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_READ_ALL_SUCCESS, members));
});

/** idx 값으로 특정 멤버 조회 */
router.get('/:idx', (req, res) => {
	const { idx } = req.params; //url에서 파라미터를 읽어온다.

  if( !idx ){	// Exception 1 : idx 값이 누락된 경우
    console.log('필요한 값이 없습니다!');
    return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
	}
	
	const member = membersDB.find( (member) => member.idx == idx);	// idx 값을 이용해 True인 요소를 JSON에서 리턴

	if(member === undefined){	// Exception 2 : 조건에 만족하는 member가 DB에 없을 때
		console.log("idx가 유효하지 않습니다.");
		return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
	}
	return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_READ_SUCCESS, member));

});
/** idx값으로 특정 멤버 삭제 */
router.delete('/:idx', (req, res) => {
	if( !idx ){	// Exception 1 : idx 값이 누락된 경우
    console.log('필요한 값이 없습니다!');
		return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
	}
	const member = membersDB.filter( (member) => member.idx == idx);	// 멤버 찾음

	if(member.length === 0){ // Exception 2 : 조건에 맞는 멤버가 없을 때
		console.log('idx가 유효하지 않습니다.');
		return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER));
	}
	membersDB = membersDB.filter(member => member.idx != idx);	//해당 idx만 제외하고 전부 쿼리
	return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_DELETE_SUCCESS, membersDB));

});
/** idx값으로 특정 멤버 정보 수정 */
router.put('/:idx', (req, res) => {
});
module.exports = router;