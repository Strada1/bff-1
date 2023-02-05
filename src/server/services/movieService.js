const MovieModel = require("../models/movie");

const addMovie = ({title, category, year, movie, duration, director, comments}) => {
  return MovieModel.create({title, category, year, movie, duration, director, comments: [comments]})
}

const removeMovie = ({id}) => {
  return MovieModel.findOneAndDelete({id})
}

const updateMovie = ({id, title, year, movie, duration, director }) => {
  const update = {
    title,
    year,
    movie,
    duration,
    director,
  };
  return MovieModel.findOneAndUpdate(id, update, { new: true });
}

const getAllMovies = () => {
  return MovieModel.find()
}

module.exports = { addMovie, removeMovie, updateMovie, getAllMovies };