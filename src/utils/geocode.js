const request =require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoieDF0bXd6IiwiYSI6ImNrN240eGxmcDBuamkza3A2cGJwcHhsMTkifQ.unQ_nJb3V6fV31falGXG4Q&limit=1`;
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect the server');
        }
        else if (body.message) {
            callback(body.message);
        }
        else if (body.features.length === 0) {
            callback("unable to find location");
        }
        else {
            const [long, lat] = body.features[0].center
            const location = body.features[0].place_name;
            callback(undefined, { long, lat,location});
        }
    });
}
module.exports = geocode;
