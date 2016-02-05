require('./testBoard.scss');
require('bootstrap/dist/css/bootstrap.css');
var io = require('socket.io-client');
var socket = io.connect();

var React = require('react');

var TestBoardComponent = React.createClass({

	getInitialState: function(){
		return{count: 1};
	},

	componentDidMount: function(){
		socket.on('buildResult', function(data){
			console.log(data);
		})
	},

	checkBuild: function(){
		socket.emit('checkBuild')
		this.setState({count: this.state.count+1});
	},

	render: function() {

		var rows = [];

		for (var i = this.state.count; i > 0; i --){
			rows.push(
				<div className="card">
					<h2 className="card-title">Hello {i}</h2>
					<p>Sup yo someone brok the build</p>
				</div>
			)
		}

		return (
			<div className="alertContainer">
				<div className="blog-masthead">
						<nav className="blog-nav">
							<img id="bell" className="bell nav-item" src="/img/bell.png"/>
							<h2 className="nav-item">Build Alert</h2>
							<button  className="btn btn-primary" type="button" onClick={this.checkBuild}>Shame!</button>
						</nav>
					<div className ="container">
						{rows}
					</div>

				</div>
			</div>
		)
	}

});

module.exports = TestBoardComponent;