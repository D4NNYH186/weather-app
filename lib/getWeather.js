const request = require('request');
const {promisify} = require('util');

require('dotenv').config() //https://www.npmjs.com/package/dotenv

const promisifiedRequest = promisify(request); 

const getWeather = async () => {
    let data = await promisifiedRequest({
        uri: `https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${process.env.APPID}`,
        json: true
    })
    return data.body;
}

module.exports = getWeather

