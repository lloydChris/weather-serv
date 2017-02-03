var request = require('request');
var OpenWeatherKey = require('./openWeatherMap.js');

var resources = {
    OpenWeatherByCoordinates: function (coordinates, callback){
	var parameters = {
	    lat: coordinates.latitude,
	    lon: coordinates.longitude,
	    APPID: OpenWeatherKey.key
	};
	var url = 'http://api.openweathermap.org/data/2.5/forecast';

	request({url:url, qs:parameters}, function(err, response, body){
		if(err){
		    return err
		}
		var result = ParseResponse(body);
		callback(result);
	    });
    }
};

function ParseResponse(body){
    var jsonBody = JSON.parse(body);
    var result = {
	city: jsonBody.city.name,
	country: jsonBody.city.country
    };
    return result;
}

module.exports = resources;