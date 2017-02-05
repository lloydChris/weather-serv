var express = require('express');
var app = express();

app.use('/', require('./routes'));

app.use(function(req, res, next){
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
    });

var server = app.listen(8080, function(){
	console.log("Listening on 8080");
    });