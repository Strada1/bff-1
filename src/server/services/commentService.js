const MovieModel = require("../models/movie");
const CommentModel = require("../models/comment");

const addComment = async (id, { title }) => {
  const movie = await MovieModel.findById(id)
  const comment = await CommentModel.create({ title })
  movie.comments.push(comment)
  movie.save();
};

const getAllComments = async (id) => {
  const movie = await MovieModel.findById(id);
  return movie.comments
}

const removeComment = async (movieId, commentId) => {
  await CommentModel.findByIdAndDelete(commentId)
  const movie = await MovieModel.findById(movieId)
  movie.comments = movie.comments.filter(item => item._id.toString() !== commentId)
  movie.save();
}

const updateComment = async (movieId, commentId, { title }) => { // TODO NOT WORK!!!
  await CommentModel.findByIdAndUpdate(commentId, { title })
  const movie = await MovieModel.findById(movieId)
  movie.comments = movie.comments.map(item => {
    if (item._id.toString() !== commentId) {
      item.title = title
    }
    return item
  })
  movie.save();
}


module.exports = { addComment, getAllComments, removeComment, updateComment };