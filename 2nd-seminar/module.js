//module

const fs = require('fs');

const numArr = [1,2,3,4,5];
const fileCommonName = 'syncText';

numArr.forEach((num)=>{
	const fileName = fileCommonName + num;
  fs.readFile(`${fileName}.txt`, data, () =>{
    console.log(`file[${fileName}] write complete`);
  });
});