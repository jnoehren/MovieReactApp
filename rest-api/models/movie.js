var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
	title:{
		type: String,
	},
	director:{
		type: String
	},
	duration:{
		type: Number
	},
	year:{
		type: Number
	},
	contentRating:{
		type: String
	},
	score:{
		type: Number
	}
});

var Movie = module.exports = mongoose.model('Movie', movieSchema);

module.exports.getMovies = function(callback, limit){

}