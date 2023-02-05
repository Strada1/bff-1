const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  title: String,
  date: { type: Date, default: Date.now },
});

const CommentModel = mongoose.model('Comment', CommentSchema);

module.exports = CommentModel;