const CommentModel = require("../models/comment");

const addComment = ({ comment, movie_id }) => {
  return CommentModel.create({ comment, movie_id });
};

module.exports = { addComment };