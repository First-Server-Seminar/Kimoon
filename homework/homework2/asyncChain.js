const members = require('./member')

async function getFemale(members){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      const data = members.filter((member) => member["gender"] === "여");
      resolve(data);
    }, 500)
  })
}

async function getYB(members){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      const data = members.filter((member) => member["status"] === "YB");
      resolve(data);
    }, 500)
  })
}

async function getiOS(members){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      const data = members.filter((member) => member["part"] === "iOS");
      resolve(data);
    }, 500)
  })
}

async function main(){
  const femaleMembers = await getFemale(members);
  const ybMembers = await getYB(femaleMembers);
  const iOSMembers = await getiOS(ybMembers);
  console.log(iOSMembers);
}

main();