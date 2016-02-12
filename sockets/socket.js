
var watcher = require('../src/jenkinsWatcher');

var interval,
	failure,
	room = "watcherRoom";

module.exports = function (io) {

	io.on('connection', function (socket) {
		socket.join(room);
		console.log("Someone new? " + );

		socket.on('disconnect', function(){
			console.log("Bye Bye");
		//	console.log(io.adapter.rooms[room]);
		});

		socket.on('SHAME', function() {
			console.log('someone got shamed');
			socket.broadcast.emit('startShame', "beep");
		});

		socket.on('checkBuild', function() {
			console.log('Checking the build');
			interval = setInterval(function(){
				console.log("success");
				io.to(room).emit('buildResult', 'SUCCESS');
			}, 10000)
			console.log('Checking the build');
			failure = setInterval(function(){
				console.log("failure");
				io.to(room).emit('buildResult', 'FAILURE');
			}, 7000)
	/*		var promise = watcher.checkBuild();

			promise.then( function(result) {
			console.log("stuff? " + result);
				socket.emit('buildResult', result);
			}, function(err){
				console.log("hello? " + err);
			}); */
			//socket.emit('buildResult', "SUCCESS");
		});

	});
}

