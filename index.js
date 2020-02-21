const hbs = require('express-handlebars');
const path = require('path');
const express = require('express');

const app = express();

const getWeather = require('./lib/getWeather');

app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');



app.get('/', async(req,res) => {
    let data = await getWeather();
    let name = (data.name);
    let wind = (data.wind.speed);
    let country = (data.sys.country);
    let temp =((data.main.temp - 273.15).toFixed(1));
    let pressure = (data.main.pressure);
    let description = (data.weather[0].description)
    // console.log(data)
    res.render('index', {temp, name, country, wind, pressure, description}); // render sends multiple files instead of just one
});

app.get('/forecasts', async(req,res) =>{
    res.render('./partials/forecasts')
});

app.listen(3000, () =>{
    console.log ('server is listening on port 3000');
});