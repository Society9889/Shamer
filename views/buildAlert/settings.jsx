require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/js/bootstrap.js');
require('./testBoard.scss');
var React = require('react');

var settingsComponent = React.createClass({

	updateTime: function (event) {
		$(event.target).closest('.row').find('input').val(event.target.value);
		this.props.changeCallback();
	},

	playAudio: function() {
		var player = new Audio("/media/shame-1.mp3");
		player.play();
	},

	render: function() {
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
												<tr>
													<td>Shame</td>
													<td><button className="btn btn-primary" onClick={this.playAudio}>Play</button></td>
												</tr>
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