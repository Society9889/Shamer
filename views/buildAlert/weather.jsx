require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/js/bootstrap.js');
require('./testBoard.scss');
require('../../public/font-awesome/scss/font-awesome.scss');
var io = require('socket.io-client');
var socket;
var player;
var React = require('react');

var weatherComponent = React.createClass({

	getInitialState: function(){
		return{
			weather: {
				temperature: 0,
				imageUrl: ""
			}
		}
	},

	componentDidMount: function() {
		//socket = this.props.sockets;
		// navigator.getLocation.getCurrentPosition(function(position){
		// 	console.log(position);
		// })
		//socket.emit("GetWeather");
		//socket.on("TheWeather", this.loadWeather);
	},

	loadWeather: function(weatherData) {
		console.log(weatherData);
		this.setState({weather: weatherData});
	},

	render: function() {

		return (
			<div>
				beep
			</div>

		)
	}

});

module.exports = weatherComponent;