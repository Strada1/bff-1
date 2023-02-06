const Comments = require('../../models/Comments');

const getAllcomments = async (movieId) => {
  const comments = await Comments.find({
    movieId: movieId,
  }).lean();
  return comments;
};

const addComment = async (movieId, comment) => {
  await Comments.create({...comment, movieId});
};

const updateComment = async (commentId, comment) => {};
const deleteComment = async (commentId) => {};

module.exports = {
  getAllcomments,
  addComment,
  updateComment,
  deleteComment,
};
