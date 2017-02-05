var utilities = require('../src/Utilities.js');
var resources = require('../src/resources/resources.js');

var weather = {
    get: function(req, res){
	res.end('weather');
    },
    getByCoordinates: function(req, res){
	var coordinates = utilities.parseCoordinates(req.params.coordinates);
	
	resources.ApixuByCoordinates(coordinates, function(result){
		res.statusCode = 200;
		res.end(JSON.stringify(result));
	    });
	/*
	resources.OpenWeatherByCoordinates(coordinates, function(result){
		res.statusCode = 200;
		res.end(JSON.stringify(result));
	    });
	*/

    },
    getByCity: function(req, res){
	res.end(req.params.city);
    }
};

module.exports = weather;