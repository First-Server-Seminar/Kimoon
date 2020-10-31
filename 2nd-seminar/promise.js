//promise

const getNumber = new Promise((resolve, reject) =>{
    console.log("getNumber pendong");
    setTimeout(()=>{
        resolve(100);
    }, 1000)
    console.log("promise test");
})

getNumber
    .then(value =>{
        console.log(value);
        return value * 2;
    })
    .then(value =>{
        console.log(value);
        return value * 3;
    })
    .then(value =>{
        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve(value+1000);
            }, 1000)
        })
    })
    .then(value => console.log(value));

//full-filled : 성공할 때 주는 결과값

//reject : 실패했을 때 넘기는 결과값