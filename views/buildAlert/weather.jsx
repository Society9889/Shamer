require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/js/bootstrap.js');
require('./buildAlert.scss');
require('../../public/font-awesome/scss/font-awesome.scss');
var io = require('socket.io-client');
var socket;
var player;
var React = require('react');

var weatherComponent = React.createClass({

	getInitialState: function(){
		return{
			weather: []
		}
	},

	componentDidMount: function() {
		socket = this.props.sockets;
		// navigator.getLocation.getCurrentPosition(function(position){
		// 	console.log(position);
		// })
		socket.emit("GetWeather");
		socket.on("TheWeather", this.loadWeather);
	},

	loadWeather: function(weatherData) {
		console.log(weatherData);
		this.setState({weather: this.state.weather.concat(weatherData)});
	},

	render: function() {

		var weatherNodes = [];
		for (var i = 0; i < this.state.weather.length - 5; i ++){
			var weatherData = this.state.weather[i],
				temps = weatherData.high + " " + weatherData.low;
			weatherNodes.push(
					<div key={i} className="weather-card col-xs-2">
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