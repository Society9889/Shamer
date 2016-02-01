require('./testBoard.scss');
require('bootstrap/dist/css/bootstrap.css');

var React = require('react');

var TestBoardComponent = React.createClass({

	componentDidMount: function(){
		
	},

	timeToShame: function(){

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

			</div>
		)
	}

});

module.exports = TestBoardComponent;