var keys = require('./keys');
var request = require('request');

var apixu  = {

    Get: function (key, coordinates, cache, callback){
	var lat = coordinates.latitude.toString();
	var lng = coordinates.longitude.toString();
	var parameters = {
	    q: lat + ',' + lng,
	    key: keys.apixu,
	    days: 1
	};
	var url = 'http://api.apixu.com/v1/forecast.json?';
	
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
	    City: jsonBody.location.name,
	    Country: jsonBody.location.country
	    
	};
	return result;
    }


module.exports = apixu;