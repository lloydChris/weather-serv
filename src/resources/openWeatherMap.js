var keys = require('./keys');
var request = require('request');

var openWeatherMap = {

    Get: function (key, coordinates, cache, callback){
	var parameters = {
	    lat: coordinates.latitude,
	    lon: coordinates.longitude,
	    APPID: keys.openWeatherMap
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
};

    function ParseResponse(body){
	var jsonBody = JSON.parse(body);
	var result = {
	    City: jsonBody.city.name,
	    Country: jsonBody.city.country
	    
	};
	return result;
    }


module.exports = openWeatherMap;