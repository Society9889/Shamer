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
		var d = document.getElementById("bell");
			d.className += " bellAnimation";
		document.getElementById('shame-audio').play();
		setTimeout(function() { document.getElementById("bell").className=""; }, 2100);

	},

	sendShameFromBoard: function(){
		socket.emit('SHAME');
	},

	render: function() {
		return (
				<div className="shameContainer">
					<img id="bell" className="" src="/img/bell.png"/>
					<audio className="hidden-audio" id="shame-audio" controls src="/media/shame-1.mp3" type="audio/mpeg"/>

				</div>
		)
	}

});

module.exports = ShameBoardComponent;