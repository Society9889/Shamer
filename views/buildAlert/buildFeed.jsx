require('./testBoard.scss');
require('bootstrap/dist/css/bootstrap.css');
require('../../public/font-awesome/scss/font-awesome.scss');
var io = require('socket.io-client');

var socket;

var React = require('react');

var buildAlertComponent = React.createClass({

	getInitialState: function(){
		return{
			count: 0, 
			results: []
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

		for (var i = this.state.count-1; i >= 0; i --){
			if(this.state.results[i] === "SUCCESS"){
				rows.push(
					<div key={i} className="card">
						<h2 className="card-title">Build status: {this.state.results[i]}</h2>
						<i className="fa fa-smile-o fa-5x success"></i>
					</div>
				)
			} else {
				rows.push(
					<div key={i} className="card">
						<h2 className="card-title">Build status: {this.state.results[i]}</h2>
						<i className="fa fa-frown-o fa-5x failure"></i>
					</div>
				)
			}
		}

		return (
			<div className ="container">
				{rows}
			</div>
		)
	}

});

module.exports = buildAlertComponent;