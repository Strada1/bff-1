"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommentToMovie = exports.createMovie = exports.getMovies = exports.getMovie = void 0;
const movies_model_1 = require("../models/movies.model");
const getMovie = () => {
    const query = movies_model_1.Movie.find().populate(['category, comments']);
    return query;
};
exports.getMovie = getMovie;
const getMovies = () => {
    const query = movies_model_1.Movie.find().populate(['category, comments']);
    return query;
};
exports.getMovies = getMovies;
const createMovie = (movieData) => movies_model_1.Movie.create(movieData);
exports.createMovie = createMovie;
const addCommentToMovie = (movieId, commentId) => movies_model_1.Movie.findByIdAndUpdate({ _id: movieId }, { $push: { comments: commentId } });
exports.addCommentToMovie = addCommentToMovie;
// const updateMovie = (id, data) => {
//   return Movie.findByIdAndUpdate(id, data, {
//     new: true,
//   });
// };
// const deleteMovie = (id) => {
//   return Movie.findByIdAndDelete(id);
// };
// const addComment = (movieId, commentId) => {
//   return Movie.findByIdAndUpdate(
//     { _id: movieId },
//     { $push: { comments: commentId } }
//   );
// };
// const removeComment = (movieId, commentId) => {
//   return Movie.findByIdAndUpdate(
//     { _id: movieId },
//     { $pull: { comments: commentId } }
//   );
// };
