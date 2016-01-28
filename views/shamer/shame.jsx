require('./mainStyle.scss');
require('bootstrap/dist/css/bootstrap.css');
var React = require('react');
var io = require('socket.io-client');
var socket = io.connect();

var ShameComponent = React.createClass({

	componentDidMount: function(){
		socket.on('startShame', function(msg) {
			console.log('ok '+ msg);
		})
	},
	sendShame: function(){
		socket.emit('SHAME');
	},

	render: function() {
		return (
				<div className="shameContainer">
					<div className="center-mid">
						<h1 className="center">Press button to shame</h1>
						<button  className="btn btn-primary" type="button" onClick={this.sendShame}>Shame!</button>
					</div>
				</div>
		)
	}

});

module.exports = ShameComponent;