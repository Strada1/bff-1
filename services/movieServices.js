const MovieModel = require("../models/movie");

const allMovies = () => {
  return MovieModel.find();
};

const moviesCreate = (req) => {
  return MovieModel.create(req.body);
};

const moviesDelete = (req) => {
  return MovieModel.findByIdAndDelete({ _id: req.params.movieId });
};

const editMovies = (req) => {
  console.log(req);
  return MovieModel.findByIdAndUpdate({ _id: req.params.movieId }, req.body, {
    new: true,
  });
};

const addedComment = (req) => {
  const comment = { comment: req.body.comment };

  return MovieModel.findByIdAndUpdate({ _id: req.params.movieId }, comment, {
    new: true,
  });
};

module.exports = {
  allMovies,
  moviesCreate,
  moviesDelete,
  editMovies,
  addedComment,
};
