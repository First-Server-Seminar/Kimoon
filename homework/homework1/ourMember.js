const members = [
    {
        "name" : "김기문",
        "address" : "서울특별시 동작구 상도동",
        "age" : 26,
        "hobby" : "우리집 고양이랑 뒹굴거리기, 기타치기"
    },
    {
        "name" : "이주은",
        "address" : "경기도 군포시",
        "age" : 24,
        "hobby" : "우리집 강아지랑 뒹굴거리기, 요리하기"
    },
    {
        "name" : "오승재",
        "address" : "서울특별시 중랑구",
        "age" : 23,
        "hobby" : "게임하기, 맛있는거 먹기, 돌아다니기"
    },
    {
        "name" : "김채원",
        "address" : "서울특별시 양천구",
        "age" : 22,
        "hobby" : "자전거타기, 강아지 영상보기, 염색하기"
    }
]

const printMembers = (members) => {
    members.forEach(function(element){
        console.log(`이름 : ${element.name}`);
        console.log(`주소 : ${element.address}`);
        console.log(`나이 : ${element.age}`);
        console.log(`취미 : ${element.hobby}`);
        console.log();
    })
}
printMembers(members);