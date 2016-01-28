
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

	});
}

