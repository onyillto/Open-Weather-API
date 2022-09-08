const express = require('express');
const hbs = require("hbs");
const path = require("path");
const app = express();


// import weatherData function
const weatherData = require('../utils/weatherData');

// Set up port
const port = process.env.PORT || 5000

// Public Static file path Setup
const publicDirectoryPath = path.join(__dirname, '../public')

// Setting up the view template Route
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup the view engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath)

//using the publicDirectorypath items
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res)=>{
    res.render('index',{
        title: 'Brit Weather-App '
    })
})

//localHost:7000/weather?address= e.g lagos
app.get('/weather', (req, res)=>{
    const address = req.query.address ;
    if (!address) {
        return res.send({
            error: "You Must Enter An Address In The Search Box"
        })
    }
    weatherData(address, (error, {temperature, description, cityName} ={})=>{
        if (error) {
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    })
})

app.get("*", (req, res)  =>{
    res.render('404', {
        title: 'Page Not Found'
    })
})


//listen to Port
app.listen(port, ()=> {
    console.log(`Server listening and running on Port: ${port}`)
})