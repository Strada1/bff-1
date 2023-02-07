const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  userName: String,
  text: String,
  movieId: { type: 'ObjectId', ref: 'Movie' },
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
