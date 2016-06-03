var fs = require('fs');
var watcher = require('../src/jenkinsWatcher');
var lunchScrapper = require('../src/lunchScrapper');
var weather = require('weather-js');

var interval,
	users = 0,
	room = "watcherRoom",
	menus = [],
	soundsOnServer = [],
	sounds = [],
	timer = 5,
	lastResult = null;

module.exports = function (io) {

	io.on('connection', function (socket) {
		socket.join(room);
		users+=1;

		/**
		* CheckBuild will set up a promise and use that to get the
		*  status of the build from an async call.
		*/
		var checkBuild = function(){
			var promise = watcher.checkBuild();
			console.log("Checking the build");
			promise.then( function(result) {
			console.log("Build: " + result.number);2
				if(lastResult === null || lastResult.number !== result.number ){
					if(result.result === 'FAILURE'){
						getRandomSound();
					}
					if(result.result === 'SUCCESS' || result.result === 'FAILURE'){
						io.to(room).emit('buildResult', result);
						lastResult = result;
					}
				}
			}, function(err){
				console.log("Error " + err);
			});
		}

		/**
		* Gets a random sound from the list of enabled sounds and sends it to the
		* frontend.
		*/
		var getRandomSound = function(){
			if(sounds.length > 0)
			{
				var sound = sounds[Math.floor(Math.random()*sounds.length)];
				io.to(room).emit("buildBroke", sound);
			}
		}

		var loadSettings = function() {
			var results = [];
			var dir = "public/media";

			fs.readdirSync(dir).forEach(function(file) {

				file = dir+'/'+file;
				var stat = fs.statSync(file);

				if (stat && stat.isDirectory()) {
					results = results.concat(_getAllFilesFromFolder(file));
				} else results.push(file.replace(dir+'/', ''));

			});
			results.forEach(function(result){
				var option = {
					sound: result,
					enabled: true
				}
				soundsOnServer.push(option);
			});
			sounds = results;
		}

		var loadMenus = function() {
			console.log("Getting the menu for this week");
			var promise = lunchScrapper.getLunchMenu();
			promise.then(function(result){
				menus = result;
				socket.emit("LoadMenus", result);
			}, function(err){
				console.log("Error" + err);
			});
		}

		if(lastResult !== null){
		 	if(lastResult.result === 'FAILURE'){
		 		getRandomSound();
		 	}
		 	socket.emit('buildResult', lastResult);
		}

		if(users === 1){
			interval = setInterval(checkBuild, timer * 60000 );
			if(sounds.length === 0){
				loadSettings();
			}
		}

		checkBuild();

		//getRandomSound();
		console.log("Someone new?");

		socket.on('disconnect', function(){
			console.log("Bye Bye");
			users-=1;
			if(users <=0 ){
				clearInterval(interval);
			}
		});

		socket.on('SHAME', function() {
			console.log('someone got shamed');
			socket.broadcast.emit('startShame', "beep");
		});

		socket.on('GetSettings', function(){
			console.log('loading the settings');
			socket.emit('Settings', soundsOnSderver, timer);
		});

		socket.on('SaveSettings', function(settings){
			var newSounds = [];

			settings.options.forEach(function(option){
				if(option.enabled){
					newSounds.push
				}
			});
			sounds = newSounds;
			soundsOnServer = settings.options;
			if(settings.pingTime != timer)
			{
				timer = settings.pingTime;
				clearInterval(interval);
				interval = setInterval(checkBuild, (timer * 60000) );
			}
			io.to(room).emit('Settings', soundsOnServer, timer);
		});

		socket.on('GetMenus', function(){
			if(menus.length > 0){
				socket.emit("LoadMenus", menus);
			} else {
				loadMenus();
			}
		});

		socket.on('GetWeather', function(){
			// weather.find({search: 'Lexington, MA', degreeType: 'F'}, function(err, result) {
			// 	if(err) console.log(err);

			// 	console.log(result[0].current);
			//   //console.log(JSON.stringify(result, null, 2));
			//   socket.emit('TheWeather', result[0].current);
			//});
		});

	});
}

