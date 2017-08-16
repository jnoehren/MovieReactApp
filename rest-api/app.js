var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/movie');
var db = mongoose.connection;

app.get('/', function(req, res){
	res.send('Hello World');
});

app.get('/api/movies', function(req, res){

});

app.listen(3000);
console.log('Running');