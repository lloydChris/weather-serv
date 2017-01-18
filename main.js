var express = require('express');
var app = express();
var redis = require('redis');

var client = redis.createClient(6379, '127.0.0.1', {no_ready_check: true});

client.on('connect', function() {
	console.log('Connected to Redis');
    });

app.get('/', function(req, res){
	client.get('wife', function(err, reply){
		if (reply){
		    res.end(reply.toString());
		    console.log(reply.toString());
		} else {
		    res.end('Expired');
		    console.log('Expired');
		}
	    });
    });

var server = app.listen(8080, function(){
	console.log("Listening on 8080");
    });

client.set('wife', 'kaila');
client.expire('wife', 5);