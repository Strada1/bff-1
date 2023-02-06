const Comments = require('../../models/Comments');
const Movies = require('../../models/Movies');

const getAllcomments = async (movieId) => {
  const comments = await Comments.find({
    movie: movieId,
  }).lean();
  return comments;
};

const addComment = async (movieId, comment) => {
  const commentId = await (
    await Comments.create({
      ...comment,
      movie: movieId,
    })
  )._id;
  const movie = await Movies.findById(movieId);
  movie.comments.push(commentId);
  await movie.save();
};

const updateComment = async (movieId, commentId, comment) => {};
const deleteComment = async (commentId) => {};

module.exports = {
  getAllcomments,
  addComment,
  updateComment,
  deleteComment,
};
