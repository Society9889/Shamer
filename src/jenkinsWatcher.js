
var jenkinsapi = require('jenkins-api'),
	config = require('../config.js');
 
// no auth 
var jenkins = jenkinsapi.init(config.jenkinsServer);

var jenkinsWatcher = {
	
	checkBuild : function() {
		console.log(config.jenkinsServer + ' ' + config.project);
		var promise = new Promise(function(resolve, reject){

			jenkins.last_build_info(config.project, function(err, data) {
			  if (err){ 
			  	console.log('Error checking build');
			  	reject(Error("oops"));
			  } else {
			 	console.log(data.result);
				resolve(data);
			}
			});

		});
		return promise;
	}

}
module.exports = jenkinsWatcher;