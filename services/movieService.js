const {Movie} = require("../models");

const createMovie = ({...params}) => {
   return  Movie.create({...params});
}

const getMovies = (body) => {
    return Movie.find(body);
}

const updateMovie = (id, body) => {
   return Movie.findByIdAndUpdate(id,body);
}

const deleteMovie = (id) => {
    return Movie.findByIdAndDelete(id);
}

const getMovieById = (id) => {
    return Movie.findById(id);
}

module.exports = {
    createMovie,
    getMovies,
    updateMovie,
    deleteMovie,
    getMovieById,
}