const CommentModel = require('../models/commentModel');

const findAllCommentsForMovie = (id) => { 
	return CommentModel.find({id: id});
}

const createComment = (movieId, body) => { 
	return CommentModel.create({movieId: movieId, ...body}); 
}

const findAndDelete = (id) => { 
	return CommentModel.findByIdAndDelete(id);
}

const findAndUpdate = (commentId, body, options) => { 
	return CommentModel.findByIdAndUpdate(commentId, body, options);
}


const findItemById = (id) => { 
	return CommentModel.findById(id);
}


module.exports = { findAllCommentsForMovie, createComment, findAndDelete, findAndUpdate, findItemById };