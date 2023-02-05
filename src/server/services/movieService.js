const MovieModel = require("../models/movie");

const addMovie = ({ title, category, year, movie, duration, directorId }) => {
  return MovieModel.create({ title, category, year, movie, duration, directorId, comments: [] })
}

const removeMovie = ({ id }) => {
  return MovieModel.findOneAndDelete(id)
}

const updateMovie = (id, { title, year, movie, duration }) => {
  const update = {
    title,
    year,
    movie,
    duration,
  };
  return MovieModel.findOneAndUpdate(id, update, { new: true });
}

const getAllMovies = () => {
  return MovieModel.find()
}

const getMovie = (id) => {
  return MovieModel.findById(id)
}

module.exports = { addMovie, removeMovie, updateMovie, getAllMovies, getMovie };