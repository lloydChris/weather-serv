var express = require('express');
var app = express();
var redis = require('redis');


app.use('/', require('./routes'));

app.use(function(req, res, next){
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
    });

var server = app.listen(8080, function(){
	console.log("Listening on 8080");
    });

var client = redis.createClient(6379, '127.0.0.1', {no_ready_check: true});

client.on('connect', function() {
	console.log('Connected to Redis');
    });
