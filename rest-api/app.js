var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

Movie = require('./models/movie');
Actor = require('./models/actor');

mongoose.connect('mongodb://localhost/movieinfo');
var db = mongoose.connection;

app.get('/', function(req, res){
	console.log('default');
});

app.get('/api/movies', function(req, res){
	Movie.getMovies(function(err, movies){
		if(err){
			throw err;
		}
		res.json(movies);
	});
});
app.get('/api/movies/:_title', function(req, res){
	Movie.getSingleMovie(req.params._title, function(err, movie){
		if(err){
			throw err;
		}
		res.json(movie);
	});
});
app.get('/api/moviesSort/:_catagory', function(req, res){
	Movie.getSorted(req.params._catagory, function(err, movies){
		if(err){
			throw err;
		}
		res.json(movies);
	});
});

app.get('/api/actors', function(req, res){
	Actor.getActors(function(err, actors){
		if(err){
			throw err
		}
		res.json(actors)
	});
});
app.get('/api/actors/:_name', function(req, res){
	Actor.getSingleActor(req.params._name, function(err, actor){
		if(err){
			throw err;
		}
		res.json(actor);
	});
});
app.get('/api/actorsSort/:_catagory', function(req, res){
	Actor.getSorted(req.params._catagory, function(err, actors){
		if(err){
			throw err
		}
		res.json(actors)
	});
});

app.listen(3001);
console.log('Running');