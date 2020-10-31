// 중학교 -> 고등학교 -> 대학교

const resign = false

const middleSchool = () => new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve("중학교");
    }, 1000)
});

const highSchool = (school) => new Promise((resolve, reject)=>{
    if(resign){
        setTimeout(()=>{
            reject(new Error('에러!'));
        }, 1000)
    }else{
        setTimeout(()=>{
            resolve(`${school} -> 고등학교`);
        }, 1000)
    }
});

const univ = (school) => new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve(`${school} -> 대학교`);
    }, 1000)
});

//await은 async 함수 내에서만 사용 가능하며, Promise 객체를 반환하는 함수에 사용할 수 있다.

async function func1(){ 
    try{
        const middle = await middleSchool();
        const high = await highSchool(middle);
        const univer = await univ(high);
        console.log(univer);
    }catch(error){
        console.log(error);
    }   
}


func1();
/*
middleSchool()
    .then(school => highSchool(school))
    .catch(error => {
        return `검정고시`;
    })
    .then(school => univ(school))
    .then(result => console.log(result))
    .catch(error => console.error(error));
 */