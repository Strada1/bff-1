const Movies = require('../../models/Movies');

const getAllcomments = async (movieId) => {
  const movie = await Movies.findById(movieId);
  const comments = movie?.comments;
  return comments;
};

const addComment = async (movieId, comment) => {
  const movie = await Movies.findById(movieId);
  movie?.comments.push(comment);
  await movie?.save();
};

const updateComment = async (commentId, comment) => {};

const deleteComment = async (commentId) => {};

module.exports = {
  getAllcomments,
  addComment,
  updateComment,
  deleteComment,
};
