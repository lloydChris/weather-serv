var utilities = require('../src/Utilities.js');
var resources = require('../src/resources/resources.js');
var async = require('async');

var weather = {
    get: function(req, res){
	res.end('weather');
    },
    getByCoordinates: function(req, res){
	var coordinates = utilities.parseCoordinates(req.params.coordinates);
	
	var asyncTasks = [];

	asyncTasks.push(function(callback){
		resources.ApixuByCoordinates(coordinates, function(result){
			res.statusCode = 200;
			callback(null, result);
		    });
	    });

	asyncTasks.push(function(callback){
		resources.OpenWeatherByCoordinates(coordinates, function(result){
			res.statusCode = 200;
			callback(null, result);
		    })});

	async.parallel(asyncTasks, function(err, results){
		if (err){
		    res.end(err.toString());		    
		}
		res.end(JSON.stringify(results));
	    });
    },
    getByCity: function(req, res){
	res.end(req.params.city);
    }
};

module.exports = weather;