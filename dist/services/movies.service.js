"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aggregateByDates = exports.aggregateByDirector = exports.deleteMovie = exports.updateMovie = exports.deleteComment = exports.addComment = exports.createMovie = exports.getMovie = exports.getMovies = void 0;
const movies_model_1 = require("../models/movies.model");
function getMovies({ year, sortOrder, populatedFields, }) {
    const query = movies_model_1.Movie.find().populate(populatedFields);
    if (year) {
        query.where('year', year);
    }
    if (sortOrder) {
        query.sort({ title: sortOrder });
    }
    return query;
}
exports.getMovies = getMovies;
function getMovie(id, populatedFields = []) {
    return movies_model_1.Movie.findById(id).populate(populatedFields);
}
exports.getMovie = getMovie;
function createMovie(movie) {
    return movies_model_1.Movie.create(movie);
}
exports.createMovie = createMovie;
function addComment(movieId, commentId) {
    return movies_model_1.Movie.findByIdAndUpdate({ _id: movieId }, { $addToSet: { comments: commentId } });
}
exports.addComment = addComment;
function deleteComment(movieId, commentId) {
    return movies_model_1.Movie.findByIdAndUpdate({ _id: movieId }, { $pull: { comments: commentId } });
}
exports.deleteComment = deleteComment;
function updateMovie(id, data) {
    return movies_model_1.Movie.findByIdAndUpdate(id, data, { new: true });
}
exports.updateMovie = updateMovie;
function deleteMovie(id) {
    return movies_model_1.Movie.findByIdAndDelete(id);
}
exports.deleteMovie = deleteMovie;
function aggregateByDirector() {
    return movies_model_1.Movie.aggregate([
        {
            $group: {
                _id: '$director',
                moviesCount: {
                    $sum: 1,
                },
            },
        },
    ]);
}
exports.aggregateByDirector = aggregateByDirector;
function aggregateByDates({ from, to }) {
    return movies_model_1.Movie.aggregate([
        {
            $match: { year: { $gte: from, $lte: to } },
        },
        { $count: 'count' },
    ]);
}
exports.aggregateByDates = aggregateByDates;
