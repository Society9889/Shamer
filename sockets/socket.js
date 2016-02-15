
var watcher = require('../src/jenkinsWatcher');

var interval,
	failure,
	users = 0,
	room = "watcherRoom",
	lastResult = null;

module.exports = function (io) {

	io.on('connection', function (socket) {
		socket.join(room);
		users+=1;
		if(lastResult !== null){
			console.log("Hello");
			socket.emit('buildResult', lastResult);
		}
	//	if(users === 1){
	//		interval = setInterval(function(){
				console.log("success");
				io.to(room).emit('buildResult', 'SUCCESS');
				lastResult = 'FAILURE';
	//		}, 10000)

	//		failure = setInterval(function(){
	//			console.log("success");
				io.to(room).emit('buildResult', 'FAILURE');
	//			io.to(room).emit('buildBroke');
	//		}, 7000)
	//	}
		console.log("Someone new?");

		socket.on('disconnect', function(){
			console.log("Bye Bye");
			users-=1;
			if(users <=0 ){
				clearInterval(interval);
				clearInterval(failure);
			}
		});

		socket.on('SHAME', function() {
			console.log('someone got shamed');
			socket.broadcast.emit('startShame', "beep");
		});

		socket.on('checkBuild', function() {
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

