const request = require('request');

const forecast = (long, lat,callback) => {
    const url = `https://api.darksky.net/forecast/5958bdd6889ce0b97f693b621992f8e8/${long},${lat}?units=si`;
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect the server")
        }
        else if (body.error) {
            callback("Unable to find location");
        }
        else {
            const {summary,temperatureHigh,temperatureLow,precipProbability} = body.daily.data[0];
            const {timezone} = body;
            callback(undefined,{timezone,summary,temperatureHigh,temperatureLow,precipProbability});
        }
    })

}
module.exports = forecast;
