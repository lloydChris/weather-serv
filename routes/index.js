var express = require('express');
var router = express.Router();
var weather = require('../src/weather.js');

router.get('/api/v1/weather', weather.get);

router.get('/api/v1/weather/coordinates/:coordinates', weather.getByCoordinates);

router.get('/api/v1/weather/city/:city', weather.getByCity);

module.exports = router;