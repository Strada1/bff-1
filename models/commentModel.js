const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  comment: String
});
  

  const Comment = mongoose.model('Comment', CommentSchema);

  module.exports = Comment;