const hbs = require('express-handlebars');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const {getWeather, getWeatherByHour} = require('./lib/getWeather');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');



// app.get('/', async(req,res) => {
//     let data = await getWeather();
//     let name = (data.name);
//     let wind = (data.wind.speed);
//     let country = (data.sys.country);
//     let temp =((data.main.temp - 273.15).toFixed(1));
//     let pressure = (data.main.pressure);
//     let description = (data.weather[0].description)
//     // console.log(data)
//     res.render('index', {temp, name, country, wind, pressure, description}); // render sends multiple files instead of just one
// });

app.get('/', (req,res) =>{
    res.render('index')
})

app.post('/', async(req,res)=>{
    let location = req.body.location;
    let code = req.body.code
    console.log(location)
    let data = await getWeather(location, code)
    console.log(data);
    
    let name = data.name;
    let temp = data.main.temp;
    let humidity = data.main.humidity;
    let feels_like = data.main.feels_like;

    let icon = data.weather[0].icon;

    res.render('index', {data:{name, temp, humidity, feels_like, icon}});
});

// app.post('/', async(req, res) =>{
//     console.log(req.body)
//     let location = req.body.location
//     let data = await getWeatherByLocation(location)
//     // console.log(data)
    
// })

app.get('/forecasts', async(req,res) =>{
    res.render('forecasts')
});

app.post('/forecasts', async(req,res)=>{
    let location=req.body.location
    let code = req.body.code

    let data= await getWeatherByHour (location, code)
    console.log(data)
    let temp = data.list[0].main.temp;
    let date = data.list[0].dt_txt;
    let name = data.city.name;
    let weather = data.list[0].weather[0].main;

    let day2 = data.list[8].dt_txt; 
    let temp2 = data.list[8].main.temp;
    let name2 = data.city.name;
    let weather2 = data.list[8].weather[0].main
    
    res.render('forecasts', {data:{name,date,temp,weather,name2,day2,temp2,weather2 }});

    
})

app.listen(3000, () =>{
    console.log ('server is listening on port 3000');
});