
var jenkinsapi = require('jenkins-api');

//These need to move to a config file at some point
var site = "";
 
// no auth 
var jenkins = jenkinsapi.init(site);

var jenkinsWatcher = {

	checkBuild : function() {
		var promise = new Promise(function(resolve, reject){

			jenkins.last_build_info('', function(err, data) {
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