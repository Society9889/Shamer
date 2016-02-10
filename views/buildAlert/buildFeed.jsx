require('./testBoard.scss');
require('bootstrap/dist/css/bootstrap.css');
var io = require('socket.io-client');

var socket;

var React = require('react');

var buildAlertComponent = React.createClass({

	getInitialState: function(){
		return{
			count: 0, 
			results: [],
			test: ['Hello', 'world']
		};
	},

	componentDidMount: function(){
		socket = this.props.sockets;
		socket.on('buildResult', this.updateList);
	},

	updateList: function (data){
		console.log(data);
		var array = [];
		array = array.push(data);
		//	this.setState({results: array});
		this.setState({results: this.state.results.concat([data])});
		this.setState({count: this.state.count+1});
		console.log(this.state);
	},

	render: function() {

		var rows = [];

		for (var i = 0; i < this.state.count; i ++){
			rows.push(
				<div key={i} className="card">
					<h2 className="card-title">Build status: {this.state.results[i]}</h2>
					<p>Sup yo someone broke the build</p>
				</div>
			)
		}

		return (
			<div className ="container">
				{rows}
			</div>
		)
	}

});

module.exports = buildAlertComponent;