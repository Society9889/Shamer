require('./testBoard.scss');
require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/js/bootstrap.js');
var io = require('socket.io-client');
var socket = io.connect();

var BuildFeed = require('./buildFeed.jsx');
var Settings = require('./settings.jsx');
var Player = new Audio("/media/shame-1.mp3");

var React = require('react');

var buildAlertComponent = React.createClass({

	componentDidMount: function(){
		socket.on('buildBroke', this.buildBroke);
	},

	checkBuild: function(){
		socket.emit('checkBuild');
	},

	buildBroke: function(sound) {
		setTimeout(function() {document.getElementById('bell').className+=" bellAnimation"; } , 500);
		Player = new Audio("/media/" + sound);
		Player.play();
		setTimeout(function() { document.getElementById("bell").className="bell"; }, 2100);
	},

	render: function() {
		return (
			<div className="alertContainer">
				<div className="blog-masthead">
						<nav className="blog-nav">
							<div className="nav-item">
								<img id="bell" className="bell" src="/img/bell.png"/>
							</div>
							<div className="nav-item">
								<img className="logo" src="/img/Logo.png"/>
							</div>
							<Settings sockets={socket}/>
						</nav>
					<BuildFeed sockets={socket}/>
				</div>
			</div>
		)
	}

});

module.exports = buildAlertComponent;