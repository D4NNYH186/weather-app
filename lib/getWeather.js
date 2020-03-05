const request = require('request');
const { promisify } = require('util');

require('dotenv').config() //https://www.npmjs.com/package/dotenv

const promisifiedRequest = promisify(request);

const getWeather = async (location, code) => {
    let data = await promisifiedRequest({
        uri: `https://api.openweathermap.org/data/2.5/weather?q=${location},${code}&APPID=${process.env.APPID}&units=metric`,
        json: true
    })
    return data.body;
}
const getWeatherByHour = async (location, code) => {
    let data = await promisifiedRequest({ 
        uri: `https://api.openweathermap.org/data/2.5/forecast?q=${location},${code}&APPID=${process.env.APPID}`,
        
        json: true
    })
    console.log(data.body);
    return data.body;
}

// const forecast = async () => {
//     let data = await promisifiedRequest({
//         uri: ``
//     })


module.exports = { 
    getWeather, 
    getWeatherByHour
}


