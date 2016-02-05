require('./testBoard.scss');
require('bootstrap/dist/css/bootstrap.css');
var io = require('socket.io-client');
var socket = io.connect();

var React = require('react');

var TestBoardComponent = React.createClass({

	componentDidMount: function(){
		socket.on('buildResult', function(data){
			console.log(data);
		})
	},

	checkBuild: function(){
		socket.emit('checkBuild')
	},

	render: function() {
		return (
			<div className="blog-masthead">
					<nav className="blog-nav">
						<img id="bell" className="bell nav-item" src="/img/bell.png"/>
						<h2 className="nav-item">Build Alert</h2>
					</nav>
				<div className ="container">
					<div className="card">
						<p>Hello my name is joe</p>
					</div>

					<div className="card">
						<p>Hello my name is joe</p>
					</div>

				</div>
				<button  className="btn btn-primary" type="button" onClick={this.checkBuild}>Shame!</button>

			</div>
		)
	}

});

module.exports = TestBoardComponent;