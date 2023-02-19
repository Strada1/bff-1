const MovieModel = require("../models/movie");
const CommentModel = require("../models/comment");

const addComment = async (id, { title }) => {
  const comment = await CommentModel.create({ title })
  await MovieModel.findByIdAndUpdate({ _id: id }, { $push: { comments: comment } })
};

const getAllComments = async () => {
  return CommentModel.find();
}

const getAllCommentsInMovie = async (id) => {
  const movie = await MovieModel.findById({ _id: id });
  return movie.comments
}

const removeComment = async (movieId, commentId) => {
  await CommentModel.findByIdAndDelete({ _id: commentId })
  await MovieModel.findByIdAndUpdate({ _id: movieId }, { $pull: { comments: { _id: commentId } } })
}

const updateComment = async (movieId, commentId, { title }) => {
  await CommentModel.findByIdAndUpdate({ _id: commentId }, { title })
  await MovieModel.findByIdAndUpdate({ _id: movieId }, {
    $set: {
      comments: {
        _id: commentId,
        title,
        date: new Date()
      }
    }
  })
}


module.exports = { addComment, getAllComments, getAllCommentsInMovie, removeComment, updateComment };