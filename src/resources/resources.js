var request = require('request');
var OpenWeatherKey = require('./openWeatherMap.js');
var redis = require('redis');

var cache = redis.createClient(6379, '127.0.0.1', {no_ready_check: true});

cache.on('connect', function() {
	console.log('Connected to Redis');
    });

var resources = {
    OpenWeatherByCoordinates: function (coordinates, callback){
	var key = JSON.stringify(coordinates);
	cache.get(key, function(err, reply){
		
		if(reply){
		    console.log('Got Cache');
		    callback(JSON.parse(reply));
		} else {
		    console.log('Empty');
		    Get(key, coordinates, callback);
		}
	    }); 
    }
};

function Get(key, coordinates, callback){
    var parameters = {
	lat: coordinates.latitude,
	lon: coordinates.longitude,
	APPID: OpenWeatherKey.key
    };
    var url = 'http://api.openweathermap.org/data/2.5/forecast';
    
    request({url:url, qs:parameters}, function(err, response, body){
	    if(err){
		console.log(err);
		return err;
	    }
	    var result = ParseResponse(body);
	    
	    cache.set(key, JSON.stringify(result));
	    cache.expire(key, 3);
	    console.log('cached');
	    callback(result);
	});   
}

function ParseResponse(body){
    var jsonBody = JSON.parse(body);
    var result = {
	city: jsonBody.city.name,
	country: jsonBody.city.country
    };
    return result;
}

module.exports = resources;