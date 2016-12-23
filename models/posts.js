var mongoose = require('mongoose');

// Post Schema
var PostsSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	},
	post: {
		type: String,
		required: true
	},
	createDate: {
		type: Date,
		default: Date.now
	}
});

var Post = module.exports = mongoose.model('Post', PostsSchema);

// Get the posts
module.exports.getPosts = function(callback, limit){
	Post.find(callback).limit(limit);
}

module.exports.getPostById = function(id, callback){
	Post.findById(id, callback);
}
