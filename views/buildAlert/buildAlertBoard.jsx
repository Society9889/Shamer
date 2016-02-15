require('./testBoard.scss');
require('bootstrap/dist/css/bootstrap.css');
var io = require('socket.io-client');
var socket = io.connect();

var BuildFeed = require('./buildFeed.jsx');

var React = require('react');

var buildAlertComponent = React.createClass({

	componentDidMount: function(){
		socket.on('buildBroke', this.buildBroke);
	},

	checkBuild: function(){
		socket.emit('checkBuild');
	},

	buildBroke: function() {
		setTimeout(function() {document.getElementById('bell').className+=" bellAnimation"; } , 500);
		//document.getElementById('shame-audio').play();
		setTimeout(function() { document.getElementById("bell").className="bell nav-item"; }, 2100);
	},

	render: function() {
		return (
			<div className="alertContainer">
				<div className="blog-masthead">
						<nav className="blog-nav">
							<img id="bell" className="bell nav-item" src="/img/bell.png"/>
							<h2 className="nav-item">Build Alert</h2>
						</nav>
					<BuildFeed sockets={socket}/>
				</div>
			</div>
		)
	}

});

module.exports = buildAlertComponent;