require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/js/bootstrap.js');
require('./buildAlert.scss');
require('../../public/font-awesome/scss/font-awesome.scss');
require('weather-icons/css/weather-icons.css');
var io = require('socket.io-client');
var socket;
var player;
var React = require('react');
var weatherInvterval;
var weatherIcon = {
	0: 'wi-tornado',
	1: 'wi-storm-showers',
	2: 'wi-hurricane',
	3: 'wi-thunderstorm',
	4: 'wi-storm-showers',
	5: 'wi-rain-mix',
	6: 'wi-sleet',
	7: 'wi-snow',
	8: 'wi-showers',
	9: 'wi-showers',
	10: 'wi-showers',
	11: 'wi-rain',
	12: 'wi-rain',
	13: 'wi-snow',
	14: 'wi-snow',
	15: 'wi-snow',
	16: 'wi-snow',
	17: 'wi-hail',
	18: 'wi-sleet',
	19: 'wi-dust',
	20: 'wi-day-fog',
	21: 'wi-day-haze',
	22: 'wi-smoke',
	23: 'wi-strong-wind',
	24: 'wi-day-windy',
	25: 'wi-snowflake-cold',
	26: 'wi-cloudy',
	27: 'wi-night-alt-cloudy',
	28: 'wi-day-cloudy',
	29: 'wi-night-alt-cloudy',
	30: 'wi-day-cloudy',
	31: 'wi-night-clear',
	32: 'wi-day-sunny',
	33: 'wi-night-clear',
	34: 'wi-day-sunny',
	35: 'wi-hail',
	36: 'wi-hot',
	37: 'wi-day-storm-showers',
	38: 'wi-day-storm-showers',
	39: 'wi-day-storm-showers',
	40: 'wi-day-showers',
	41: 'wi-snow',
	42: 'wi-day-snow',
	43: 'wi-snow',
	44: 'wi-day-cloudy',
	45: 'wi-thunderstorm',
	46: 'wi-snow',
	47: 'wi-day-storm-showers',
	3200: 'wi-alien'
};

var weatherComponent = React.createClass({

	getInitialState: function(){
		return{
			weather: []
		}
	},

	componentDidMount: function() {
		socket = this.props.sockets;
		socket.emit("GetWeather");
		socket.on("TheWeather", this.loadWeather);
		this.setUpWeatherInterval(socket);
	},

	/**
	* Setting up the interval to watch the time and get the weather
	*	at 6:00am everyday.
	*/
	setUpWeatherInterval: function(socket){
		var now = new Date(),
			me = this,
			timer = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0, 0) - now;
		
		if(timer <= 0){
			timer += 86400000;
		}

		weatherInvterval = window.setTimeout(function(){
			socket.emit("GetWeather");
			me.setUpWeatherInterval(socket);
		} , timer);
	},

	loadWeather: function(weatherData) {
		this.setState({weather: this.state.weather.concat(weatherData)});
	},

	render: function() {

		var weatherNodes = [];
		for (var i = 0; i < this.state.weather.length - 5; i ++){
			var weatherData = this.state.weather[i],
				temps = weatherData.high + "° " + weatherData.low + "°",
				day = weatherData.day,
				code = "wi " + weatherIcon[weatherData.code];
			weatherNodes.push(
					<div key={i} className="weather-card col-xs-2">
							<h2>{day}</h2>
							<i className={code}></i>
							<h2>{temps}</h2>
					</div>
			)
		}
		return (
			<div className="row weather-row">
				{weatherNodes}
			</div>

		)
	}

});

module.exports = weatherComponent;