const { Movie } = require("../models/movie");

async function getMovie(id) {
    return await Movie.findById(id);
}

async function getMovies() {
    return await Movie.find().populate(["categoryIds", "directorId"]);
}

async function createMovie(values) {
    await Movie.create(values);
}

async function updateMovie(id, updates) {
    await Movie.findOneAndUpdate({_id: id}, updates); 
}

async function deleteMovie(id) {
    await Movie.findOneAndDelete({_id: id});
}

module.exports = {
    getMovie,
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie
};
