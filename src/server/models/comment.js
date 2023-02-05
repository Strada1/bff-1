const mongoose = require('mongoose')
const { ObjectId } = require("mongodb");

const CommentSchema = new mongoose.Schema({
  comment: String,
  movie_id: { type: ObjectId, ref: 'Movie' },
});
const CommentModel = mongoose.model('Comment', CommentSchema);

module.exports = CommentModel