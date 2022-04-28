const fetch = require('node-fetch')

async function readTxtFromURL() {
    const response = await fetch("https://www.monogo.pl/competition/input.txt");
    const data = await response.text();

    return JSON.parse(data);
}


module.exports = {
    readTxtFromURL
}
