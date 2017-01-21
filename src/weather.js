var weather = {
    get: function(req, res){
	res.end('weather');
    },
    getCity: function(req, res){
	res.end(req.params.city);
    }
};

module.exports = weather;