"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.addComment = exports.createMovie = exports.getMovie = exports.getMovies = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../shared/ApiError"));
const movies_model_1 = require("../models/movies.model");
function getMovies(populatedFields) {
    return movies_model_1.Movie.find().populate(populatedFields).lean();
}
exports.getMovies = getMovies;
function getMovie(id, populatedFields = []) {
    return __awaiter(this, void 0, void 0, function* () {
        const movie = yield movies_model_1.Movie.findById(id).populate(populatedFields);
        if (!movie) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Movie not found');
        }
        return movie;
    });
}
exports.getMovie = getMovie;
function createMovie({ title, category, year, duration, director, }) {
    if (!title || !category) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'required fields are missing');
    }
    return movies_model_1.Movie.create({ title, category, year, duration, director });
}
exports.createMovie = createMovie;
function addComment(movieId, commentId) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedMovie = yield movies_model_1.Movie.findByIdAndUpdate({ _id: movieId }, { $push: { comments: commentId } });
        if (!updatedMovie) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Movie not found');
        }
        return updatedMovie;
    });
}
exports.addComment = addComment;
function updateMovie(id, { title, category, year, duration, director }) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedMovie = yield movies_model_1.Movie.findByIdAndUpdate(id, { title, category, year, duration, director }, { new: true });
        if (!updatedMovie) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Movie not found');
        }
        return updatedMovie;
    });
}
exports.updateMovie = updateMovie;
function deleteMovie(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedMovie = yield movies_model_1.Movie.findByIdAndDelete(id);
        if (!deletedMovie) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Movie not found');
        }
        return deletedMovie;
    });
}
exports.deleteMovie = deleteMovie;
