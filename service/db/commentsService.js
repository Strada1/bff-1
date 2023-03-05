const Comments = require('../../models/Comments');
const Movies = require('../../models/Movies');
const mongoose = require('mongoose');

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
  const commentarii = await Comments.create({...comment, movie: movieId}, async (error, comment) => {
    await Movies.findByIdAndUpdate(movieId, {$push: {comments: comment.id}});
  });
};

const updateComment = async (commentId, comment) => {
  await Comments.findByIdAndUpdate(commentId, comment);
};

const deleteComment = async (movieId, commentId) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await Comments.findByIdAndDelete(commentId, {session});
    await Movies.findByIdAndUpdate(movieId, {$pull: {comments: commentId}}, {session});
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  }
};

module.exports = {
  getAllcomments,
  getCommentById,
  addComment,
  updateComment,
  deleteComment,
};
