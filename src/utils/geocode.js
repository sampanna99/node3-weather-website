const request = require('request');
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2FtcGFubmE5OSIsImEiOiJjazV6ejVwcmQwMm1qM2VweGVmZjdyaGY2In0.QycSBn2QYMS7ouuMZ2_b-A&limit=1';

    request({
        url,
        json: true
    }, (error, {body}) => {
        if(error){
            callback('Unable to connect to services', undefined);
        }
        else if (body.features.length === 0){
            callback('Unable to find the location', undefined);   
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode