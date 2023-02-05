const MovieModel = require("../models/movie");

const addedComment = (req) => {
  const comment = { comment: req.body.comment };

  return MovieModel.findByIdAndUpdate({ _id: req.params.movieId }, comment, {
    new: true,
  });
};

const deleteComment = (req) => {
  const comment = { comment: "" };

  return MovieModel.findByIdAndUpdate({ _id: req.params.movieId }, comment, {
    new: true,
  });
};

module.exports = { addedComment, deleteComment };
