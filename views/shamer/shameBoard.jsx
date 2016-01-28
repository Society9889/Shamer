require('./mainStyle.scss');
require('bootstrap/dist/css/bootstrap.css');

var React = require('react');
var io = require('socket.io-client');
var socket = io.connect();

var ShameBoardComponent = React.createClass({

	componentDidMount: function(){
		socket.on('startShame', this. timeToShame);
	},

	timeToShame: function(){
		document.getElementById('shame-audio').play();
	},

	sendShameFromBoard: function(){
		socket.emit('SHAME');
	},

	render: function() {
		return (
				<div className="shameContainer">
					<img src="/img/bell.png"/>
					<audio className="hidden-audio" id="shame-audio" controls src="/media/shame-1.mp3" type="audio/mpeg"/>

				</div>
		)
	}

});

module.exports = ShameBoardComponent;