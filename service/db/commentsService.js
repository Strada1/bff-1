const Comments = require('../../models/Comments');
const Movies = require('../../models/Movies');

const getAllcomments = async (movieId) => {
  const comments = await Comments.find({
    movie: movieId,
  }).lean();
  return comments;
};

const getCommentById = async (commentId) => {
  const comment = await Comments.findById(commentId).lean();
  return comment;
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

const updateComment = async (commentId, comment) => {
  await Comments.findByIdAndUpdate(commentId, comment);
};

const deleteComment = async (commentId) => {
  await Comments.findByIdAndDelete(commentId);
};

module.exports = {
  getAllcomments,
  getCommentById,
  addComment,
  updateComment,
  deleteComment,
};
