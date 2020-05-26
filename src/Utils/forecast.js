const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url = 'https://api.darksky.net/forecast/6f9c15b4391576a6a1eda23fc8ca5a95/'+ latitude + ',' + longitude +'?units=si' 
	request({url, json: true}, (error, {body}) => {
		if(error){
			callback('Unable to connect to Location services', undefined)
		}
		else if(body.error){
			callback('Unable to find location', undefined)
		}else 
		{
			callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability} chance of rain. Temperature high: ${body.daily.data[0].temperatureHigh} Temperature low: ${body.daily.data[0].temperatureLow}`)

		}
	})
}

module.exports = forecast
