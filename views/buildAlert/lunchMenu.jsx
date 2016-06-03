require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/js/bootstrap.js');
require('./testBoard.scss');
var io = require('socket.io-client');
var socket;
var React = require('react');

var lunchMenuComponent = React.createClass({

	getInitialState: function(){
		return{
			menus: []
		};
	},

	componentDidMount: function() {
		socket = this.props.sockets;
		socket.emit("GetMenus");
		socket.on("LoadMenus", this.loadMenus);
	},

	loadMenus: function(menus){
		this.setState({menus: menus});
	},

	render: function() {
		var items = [];

		this.state.menus.forEach(function(menu){
			var cls = "item";
			if(menu[0] == 'Monday'){
				cls = "item active";
			}
			items.push(
				<div key={menu[0]} className={cls}>
					<div className="dayLabel">
				    	<h1>{menu[0]}</h1>
				    </div>
				    <table className="menu">
				    	<tbody>
				    		<tr>
				    			<td className="menuItem">
				    				{menu[1]}
				    			</td>
				    			<td>
				    				{menu[2]}
				    			</td>
				    		</tr>
				    		<tr>
				    			<td className="menuItem">
				    				{menu[3]}
				    			</td>
				    			<td>
				    				{menu[4]}
				    			</td>
				    		</tr>
				    		<tr>
				    			<td className="menuItem">
				    				{menu[5]}
				    			</td>
				    			<td>
				    				{menu[6]}
				    			</td>
				    		</tr>
				    		<tr>
				    			<td className="menuItem">
				    				{menu[7]}
				    			</td>
				    			<td>
				    				{menu[8]}
				    			</td>
				    		</tr>
				    		<tr>
				    			<td className="menuItem">
				    				{menu[9]}
				    			</td>
				    			<td>
				    				{menu[10]}
				    			</td>
				    		</tr>
				    	</tbody>
				    </table>
				</div>
			)
		});
		return (
			<div id="carousel-lunch" className="carousel slide lunchHeight" data-ride="carousel">
			  <ol className="carousel-indicators">
			    <li data-target="#carousel-lunch" data-slide-to="0" className="active"></li>
			    <li data-target="#carousel-lunch" data-slide-to="1"></li>
			    <li data-target="#carousel-lunch" data-slide-to="2"></li>
			    <li data-target="#carousel-lunch" data-slide-to="3"></li>
			    <li data-target="#carousel-lunch" data-slide-to="4"></li>
			  </ol>

			  <div className="carousel-inner" role="listbox">
			    {items}
			  </div>

			  <a className="left carousel-control" href="#carousel-lunch" role="button" data-slide="prev">
			    <span className="glyphicon glyphicon-chevron-left menuArrow" aria-hidden="true"></span>
			    <span className="sr-only">Previous</span>
			  </a>
			  <a className="right carousel-control" href="#carousel-lunch" role="button" data-slide="next">
			    <span className="glyphicon glyphicon-chevron-right menuArrow" aria-hidden="true"></span>
			    <span className="sr-only">Next</span>
			  </a>
			</div>
		)
	}
});
module.exports = lunchMenuComponent;