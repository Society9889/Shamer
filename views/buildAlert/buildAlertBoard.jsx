require('./testBoard.scss');
require('bootstrap/dist/css/bootstrap.css');
var io = require('socket.io-client');
var socket = io.connect();

var BuildFeed = require('./buildFeed.jsx');

var React = require('react');

var buildAlertComponent = React.createClass({

	render: function() {
		return (
			<div className="alertContainer">
				<div className="blog-masthead">
						<nav className="blog-nav">
							<img id="bell" className="bell nav-item" src="/img/bell.png"/>
							<h2 className="nav-item">Build Alert</h2>
							<button  className="btn btn-primary" type="button" onClick={this.checkBuild}>Shame!</button>
						</nav>
					<BuildFeed sockets={socket}/>
				</div>
			</div>
		)
	}

});

module.exports = buildAlertComponent;