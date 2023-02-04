const CommentScheme = require("../models/comments");
const MovieSchema = require("../models/movie");

const addComments = async ({ params, body }) => {
  const { name, like, dislike, text } = body;
  const { id } = params;

  const updatedMovie = await CommentScheme.create({
    name,
    like,
    dislike,
    text,
  });

  const currentMovie = await MovieSchema.findByIdAndUpdate(id, {
    $push: { comments: updatedMovie._id },
  });

  return currentMovie;
};

const editComments = async ({ params, body }) => {
  const { commentId } = params;
  const { text, name, like, dislike } = body;

  const currentComment = await CommentScheme.findByIdAndUpdate(commentId, {
    text,
    name,
    like,
    dislike,
  });
  return currentComment;
};

const deleteComments = async ({ id, commentId }) => {
  const currentMovie = await MovieSchema.findByIdAndUpdate(id, {
    $pull: { comments: commentId },
  });

  return currentMovie;
};

module.exports = { editComments, deleteComments, addComments };
