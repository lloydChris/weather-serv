var express = require('express');
var router = express.Router();

router.get('/api/v1/weather', function(req, res) {
	res.end('weather');
});

router.get('/api/v1/weather/:city', function(req, res){
	res.end(req.params.city);
});

module.exports = router;