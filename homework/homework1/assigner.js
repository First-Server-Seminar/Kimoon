const assigner = (teamNumber) => {

    //dependencies
    const members = require('./member')     //member 데이터
    const shuffle = require('./module/shuffler')    //shuffle 모듈
    const Group = require('./module/Group')    //Group 클래스

    let mixedArray = shuffle(members)   //무작위로 섞습니다

    //무작위로 섞인 배열에서 OB와 YB만을 `필터링하여 앞 뒤로 붙입니다.
    mixedArray = [
        ...mixedArray.filter((member) => member["status"]==='OB'),
        ...mixedArray.filter((member) => member["status"]==='YB')
    ]

    assignedGroup = new Array();    //Group 클래스의 배열
    for(let i = 0; i < teamNumber; i++) assignedGroup.push(new Group(i+1));  //Group 객체들을 생성

    for(let i = 0; i < mixedArray.length; i++)
        assignedGroup[i%teamNumber].push(mixedArray[i]); //concat한 배열에서 한명씩 꺼내 Group 객체들에 돌아가며 넣습니다.

    return assignedGroup;
}

//main 함수
const printFunc = require('./module/printer')   //출력을 위한 모듈
const result = assigner(6);

result.forEach( printFunc ) //group별로 출력