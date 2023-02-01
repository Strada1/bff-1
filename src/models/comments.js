const { default: mongoose } = require("mongoose");

const CommentScheme = new mongoose.Schema({
  name: String,
  like: Number,
  dislike: Number,
  text: String,
});

module.exports = mongoose.model("Comment", CommentScheme);
