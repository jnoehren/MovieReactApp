var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
	title: String,
	director: String,
	duration: Number,
	year: Number,
	contentRating: String,
	score: Number
});

var Movie = module.exports = mongoose.model('movie', movieSchema);

module.exports.getMovies = function(callback){
	Movie.find(callback);
}

module.exports.getSingleMovie = function(title, callback){
	Movie.find(callback).where('title').equals(title);
}

module.exports.getSorted = function(catagory, callback){
	if(catagory=="imdb_score"){
		Movie.find(callback).sort({imdb_score: -1});
	}
	else if(catagory=="title"){
		Movie.find(callback).sort({title: 1});
	}
	else if(catagory=="director"){
		Movie.find(callback).sort({director: 1});
	}
	else if(catagory=="content_rating"){
		Movie.find(callback).sort({content_rating: 1});
	}
	else if(catagory=="year"){
		Movie.find(callback).sort({year: -1});
	}
	else{
		Movie.find(callback).sort({title: 1});
	}
}