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
  Comments.create({...comment, movie: movieId}, async (error, comment) => {
    await Movies.findByIdAndUpdate(movieId, {$push: {comments: comment.id}});
  });
};

const updateComment = async (commentId, comment) => {
  await Comments.findByIdAndUpdate(commentId, comment);
};

const deleteComment = async (movieId, commentId) => {
  await Comments.findByIdAndDelete(commentId);
  await Movies.findByIdAndUpdate(movieId, {$pull: {comments: {_id: commentId}}});
};

module.exports = {
  getAllcomments,
  getCommentById,
  addComment,
  updateComment,
  deleteComment,
};
