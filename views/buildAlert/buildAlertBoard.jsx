require('./testBoard.scss');
require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/js/bootstrap.js');
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
							<button className="setting-button btn nav-item" data-toggle="modal" data-target="#myModal">
								<i className="fa fa-cog fa-5x white"></i>
							</button>
						</nav>
					<BuildFeed sockets={socket}/>
				</div>
				<div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
					<div className="modal-dialog" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
								<h4 className="modal-title" id="myModalLabel">Modal title</h4>
							</div>
							<div className="modal-body">
								settings menu
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
								<button type="button" className="btn btn-primary">Save</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

});

module.exports = buildAlertComponent;