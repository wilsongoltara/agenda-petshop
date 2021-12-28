const fs = require('fs');
const path = require('path');

module.exports = (pathArquive, nameArquive, callbackImageCreate) => {
    const validTypes = ['jpg', 'png', 'jpeg'];
    const type = path.extname(pathArquive);
    const typeIsValid = validTypes.indexOf(type.substring(1)) !== -1;

    if(typeIsValid) {
        const newPath = `./assets/images/${nameArquive}${type}`;
        
        fs.createReadStream(pathArquive)
            .pipe(fs.createWriteStream(`./assets/images/${nameArquive}`))
            .on('finish', () => callbackImageCreate(false, newPath));
    } else {
        const error = 'type is invalid';
        console.log('Error! Type invalid!');
        callbackImageCreate(error);
    }
}