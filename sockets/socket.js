
var watcher = require('../src/jenkinsWatcher');

module.exports = function (io) {

	io.on('connection', function (socket) {
		socket.emit('testConnection');
		console.log("Someone new?");

		socket.on('disconnect', function(){
			console.log("Bye Bye");
		});

		socket.on('SHAME', function() {
			console.log('someone got shamed');
			socket.broadcast.emit('startShame', "beep");
		});

		socket.on('checkBuild', function() {
			console.log('Checking the build');
		/*	var promise = watcher.checkBuild();

			promise.then( function(result) {
			console.log("stuff? " + result);
				socket.emit('buildResult', result);
			}, function(err){
				console.log("hello? " + err);
			}); */
			socket.emit('buildResult', "SUCCESS");
		});

	});
}

