const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3000;

//Define path for express config
const publicDirectory = path.join(__dirname, '../public');
const viewspath = path.join(__dirname, '../templates/views');
const partialspath = path.join(__dirname, '../templates/partials');

//setup handle bar engine and view location
app.set('view engine', 'hbs')
app.set('views', viewspath);
hbs.registerPartials(partialspath);

//setup static directory to serve
app.use(express.static(publicDirectory))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sam pok'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sampa'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'call sam',
        title: 'Help',
        name: 'Sam'
    })
})
app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'Address is required'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
});
app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        }) 
        }

    res.send({
        products: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help page not found',
        title: '404',
        name: 'Sam'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        title: '404',
        name: 'Sam'
    })
})



app.listen(port, () => {
    console.log('Server is up on port ' + port);
});