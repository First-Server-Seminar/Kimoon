const fs = require('fs');
const crypto = require('crypto');

async function encrypt(fileName, password){
    crypto.randomBytes(64, (err, buf)=>{
        const salt = buf.toString('base64');
        crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, buf) => {
            fs.writeFile(fileName, buf.toString('base64'), () => {
                console.log(`${fileName} has been created.`);
            })
        });
    });
}

const fileName = "result.txt";
const password = "testpassword";

encrypt(fileName, password);
