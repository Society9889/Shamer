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
		document.getElementById('shame-audio').play();
		setTimeout(function() { document.getElementById("bell").className="bell nav-item"; }, 2100);
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
								<h2>Build Alert</h2>
							</div>
							<audio className="hidden-audio" id="shame-audio" controls src="/media/shame-1.mp3" type="audio/mpeg"/>
							<div className="nav-item">
								<i className="fa fa-cog fa-5"></i>
							</div>
						</nav>
					<BuildFeed sockets={socket}/>
				</div>
			</div>
		)
	}

});

module.exports = buildAlertComponent;