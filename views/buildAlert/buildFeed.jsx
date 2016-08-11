require('./buildAlert.scss');
require('bootstrap/dist/css/bootstrap.css');
require('../../public/font-awesome/scss/font-awesome.scss');
var io = require('socket.io-client');
var update = require('react-addons-update');
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
		var array = [];
		if(this.state.count === 25){
			//after the UI has 25 elements showing, we only want to show those 25.
			this.setState({
				results: update(this.state.results, {$splice: [[0,1]]}).concat([data])
			});
		} else {
			this.setState({results: this.state.results.concat([data])});
			this.setState({count: this.state.count+1});
		}
		console.log(this.state.results.length)
	},

	render: function() {

		var rows = [];

		for (var i = this.state.count-1; i >= 0; i --){
			if(this.state.results[i].result === "SUCCESS"){
				rows.push(
					<div key={i} className="card">
						<h2 className="card-title">Build #{this.state.results[i].number}</h2>
						<i className="fa fa-smile-o fa-5x success"></i>
					</div>
				)
			} else {
				rows.push(
					<div key={i} className="card">
						<h2 className="card-title">Build #{this.state.results[i].number}</h2>
						<i className="fa fa-frown-o fa-5x failure"></i>
					</div>
				)
			}
		}

		return (
			<div>
				{rows}
			</div>
		)
	}

});

module.exports = buildAlertComponent;