var weather = require('openweathermap'),
	request = require('request');

var weatherInfo = {

	getWeather: function (){

		var promise = new Promise(function(resolve, reject) {
			var cfg = {
				id: 4941935,
				APPID: '',
				cnt: 5
			}
			weather.defaults({units: 'imperial', lang: 'rn', mode: 'json'});

			weather.forecast(cfg, function (err, result) {
				if (err){
					console.log('No weather data');
					reject(Error("oops"));
				}else {
					resolve(result);
				}
			});
		});
		return promise;
	},


	forecast: function(place){
		var promise = new Promise(function(resolve, reject) {
			var cfg = {
				id: 4941935,
				APPID: '',
				cnt: 5
			}
			request('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Lexington%2C%20ma%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', function (error, response, body) {
				if (!error && response.statusCode == 200) {
					resolve(JSON.parse(body));
				} else {
					console.log('No weather data');
					reject(Error("oops"));
				}
			});
		});
		return promise;
	}

}

module.exports = weatherInfo;