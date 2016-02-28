require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/js/bootstrap.js');
require('./testBoard.scss');

var io = require('socket.io-client');

var socket;

var player;

var React = require('react');

var settingsComponent = React.createClass({

	getInitialState: function(){
		return{
			options: []
		}
	},

	componentDidMount: function() {
		socket = this.props.sockets;
		socket.emit("GetSettings");
		socket.on("Settings", this.loadSettings);
	},

	updateTime: function (event) {
		$(event.target).closest('.row').find('input').val(event.target.value);
	},

	playAudio: function (sound) {
		console.log(sound);
		player = new Audio("/media/"+sound);
		player.play();
	},

	loadSettings: function (settings){
		this.setState({options: settings});
		console.log(this.state);
	},

	render: function() {

		var rows = [];
		var me =this;

		this.state.options.forEach(function(option) {
			rows.push(
			<tr key={option}>
				<td>{option}</td>
				<td>
					<button className="btn btn-primary" value={option} onClick={me.playAudio.bind(me, option)}>Play</button>
				</td>
			</tr>
			);
		});

		return (
			<div className="nav-item-right">
				<button className="setting-button btn" data-toggle="modal" data-target="#myModal">
					<i className="fa fa-cog fa-5x white"></i>
				</button>
				<div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
									<h4 className="modal-title" id="myModalLabel">Settings</h4>
								</div>
								<div className="modal-body">
									<div className="row">
										<h2>Sounds</h2>
										<p>Check the sounds you wish to enable, press play for a preview</p>
										<table className="table table-hover">
											<thead>
												<tr>
													<th>Sound</th>
													<th>Preview</th>
												</tr>
											</thead>
											<tbody>
											{rows}
											</tbody>
										</table>
									</div>
									<div className="row">
							        	<div className="col-md-10 col-xs-9">
							            	<input type="range" min="1" max="10" onChange={this.updateTime} />
							            </div>
							            <div className="col-md-2 col-xs-3">
							            	<input type="number" id="Count"className="form-control" min="1" max="10" defaultValue="5" onChange={this.updateTime}/>
							            </div>
							        </div>
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

module.exports = settingsComponent;