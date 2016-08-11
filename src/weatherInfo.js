var weather = require('openweathermap');

var weatherInfo = {

	getWeather: function (){
		var cfg = {
			APPID: '',
			units: 'imperial',
			lang: 'en',
			mode: 'json',
			q: 'Lexington,US'
		}
		weather.forecast({, function(result){
			console.log(result);
		});
	}

}

module.exports = weatherInfo;