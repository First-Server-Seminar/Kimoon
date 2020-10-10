/*
 * 일반적 선언식
 */
function add(x, y){
    return x+y;
}
console.log(add(2,3));

/*
 * 함수 표현식
 */
var addFunc = function(x, y){
    return x + y;
}
console.log(add("안녕", "하세요"));

/**
 *  화살표 함수
 */
var add = (x, y) => {
    return x + y;
}
console.log(add(2,3))

//위와 아래는 같다.
var add = (x, y) => (x + y);    //괄호는 생략 가능하다.