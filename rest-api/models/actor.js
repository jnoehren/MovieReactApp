var mongoose = require('mongoose');

var actorSchema = mongoose.Schema({
	name: String,
	movies: [],
	likes: Number
});

var Actor = module.exports = mongoose.model('actor', actorSchema);

module.exports.getActors = function(callback){
	Actor.find(callback);
}

module.exports.getSingleActor = function(name, callback){
	Actor.find(callback).where('actor').equals(name);
}

module.exports.getSorted = function(catagory, callback){
	if(catagory=="name"){
		Actor.find(callback).sort({actor: 1});
	}
	else if(catagory=="likes"){
		Actor.find(callback).sort({likes: -1});
	}
	else if(catagory=="movies"){
		Actor.aggregate([
			{"$project":{
				"actor":1,
				"movies":1,
				"likes":1,
				"length":{"$size":"$movies"}								
			}},
			{"$sort":{"length": -1}}], callback);
	}
	else{
		Actor.find(callback).sort({actor: 1});	
	}
}