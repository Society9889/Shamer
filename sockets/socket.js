
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
	/*	if(lastResult !== null){
			console.log("Hello");
			if(lastResult.result === 'FAILURE'){
				socket.emit("buildBroke");
			}
			socket.emit('buildResult', lastResult);
		}
		var promise = watcher.checkBuild();

			promise.then( function(result) {
			console.log("stuff? " + result.number);
				if(lastResult === null || lastResult.number !== result.number ){
					if(result.result === 'FAILURE'){
						socket.emit("buildBroke");
					}
					if(result.result === 'SUCCESS' || result.result === 'FAILURE'){
						io.to(room).emit('buildResult', result);
						lastResult = result;
					}
				}
			}, function(err){
				console.log("hello? " + err);
		});

		if(users === 1){
			interval = setInterval(function(){
				console.log("Checking the build");
			var promise = watcher.checkBuild();

				promise.then( function(result) {
				console.log("stuff? " + result.number);
					if(lastResult.number !== result.number){
						if(result.result === 'FAILURE'){
							socket.emit("buildBroke");
						}
						if(result.result === 'SUCCESS' || result.result === 'FAILURE'){
							io.to(room).emit('buildResult', result);
							lastResult = result;
						}
					}
				}, function(err){
					console.log("hello? " + err);
			});

			}, 600000) 
		}*/
		
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

		socket.on('GetSettings', function(){
			console.log('loading the settings');
			
		})

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

