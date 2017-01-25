var utilities = require('../src/Utilities.js');

var weather = {
    get: function(req, res){
	res.end('weather');
    },
    getByCoordinates: function(req, res){
	var coordinates = utilities.parseCoordinates(req.params.coordinates);

	res.end(coordinates.latitude + coordinates.longitude);
    },
    getByCity: function(req, res){
	res.end(req.params.city);
    }
};

module.exports = weather;