const { readFile } = require('fs').promises;

async function readTxt() {
    let readTxtResult;
    try {
        readTxtResult = await readFile('txt.txt', 'utf8');
    } catch (e) {
        if (e.code === 'ENOENT') {
            console.error('File is not valid');
        } else {
            console.error('Unknown error', e);
        }
    }
    // return JSON.parse(readTxtResult);
    return readTxtResult;
}

module.exports = {
    readTxt
}
