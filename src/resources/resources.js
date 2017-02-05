var openWeatherMap = require('./openWeatherMap.js');
var apixu = require('./apixu');
var redis = require('redis');

var cache = redis.createClient(6379, '127.0.0.1', {no_ready_check: true});

cache.on('connect', function() {
	console.log('Connected to Redis');
    });

var resources = {
    OpenWeatherByCoordinates: function (coordinates, callback){
	var key = 'OpenWeather' + JSON.stringify(coordinates);
	cache.get(key, function(err, reply){
		
		if(reply){
		    console.log('Got Cache');
		    callback(JSON.parse(reply));
		} else {
		    console.log('Empty');
		    openWeatherMap.Get(key, coordinates, cache, callback);
		}
	    }); 
    },
    ApixuByCoordinates: function (coordinates, callback){
	var key = 'apixu' + JSON.stringify(coordinates);
	cache.get(key, function(err, reply){
		
		if(reply){
		    console.log('Got Cache');
		    callback(JSON.parse(reply));
		} else {
		    console.log('Empty');
		    apixu.Get(key, coordinates, cache, callback);
		}
	    }); 

    }
};

module.exports = resources;