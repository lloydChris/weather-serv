var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.end("Hello World!");
	console.log(reply.toString());
    });

var server = app.listen(8080, function(){
	console.log("Listening on 8080");
    });
