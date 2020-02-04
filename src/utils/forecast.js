const request = require('request');


const forecast = (lattitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/7dd038c08aab2e94fde61c505a425994/' + lattitude + "," + longitude;

    request({
        url,
        json: true
    }, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather services', undefined);
        }else if (body.error){
            callback('Unable to find location', undefined);
        }else{
            callback(undefined, body.daily.data[0].summary + "It is currently " + body.currently.temperature + 'degrees out. There is a ' + body.currently.precipProbability + "% chance of reain");
            
        }

    })

}

module.exports = forecast;