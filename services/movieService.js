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

const getAllMovies = ({ sort, title, year }) => {
    const query = Movie.find().lean().populate('directorId').populate('category')
    if (title) {
        query.where('title', title)
    }
    if (year) {
        query.where('year', year)
    }
    if (sort) {
        query.sort({ year: sort })
    }
    return query.exec()
}

module.exports = {
    createMovie,
    getMovies,
    updateMovie,
    deleteMovie,
    getMovieById,
}