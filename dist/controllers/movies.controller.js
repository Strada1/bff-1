"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.aggregateByDates = exports.aggregateByDirector = exports.deleteMovie = exports.updateMovie = exports.createMovie = exports.getMovie = exports.getMovies = void 0;
const http_status_1 = __importDefault(require("http-status"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const moviesService = __importStar(require("../services/movies.service"));
const helpers_1 = require("../shared/helpers");
const ApiError_1 = __importDefault(require("../shared/ApiError"));
const cache_service_1 = require("../services/cache.service");
const const_1 = require("../shared/const");
const moviesCache = new cache_service_1.CacheService();
exports.getMovies = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { year, sort, populatedFields } = req.query;
    const requestHasOptions = Object.keys(req.query).length > 0;
    if (!requestHasOptions && moviesCache.has(const_1.CACHE_KEYS.ALL_MOVIES)) {
        const cachedMovies = moviesCache.get(const_1.CACHE_KEYS.ALL_MOVIES);
        res.status(http_status_1.default.OK).send({ movies: cachedMovies });
        return;
    }
    const movies = yield moviesService.getMovies({
        year,
        sortOrder: sort,
        populatedFields: (0, helpers_1.convertQueryToArray)(populatedFields),
    });
    if (!requestHasOptions) {
        moviesCache.set(const_1.CACHE_KEYS.ALL_MOVIES, movies);
    }
    res.status(http_status_1.default.OK).send({ movies });
}));
exports.getMovie = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId } = req.params;
    const { populatedFields } = req.query;
    const movie = yield moviesService.getMovie(movieId, (0, helpers_1.convertQueryToArray)(populatedFields));
    if (!movie) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Movie not found');
    }
    res.status(http_status_1.default.OK).send(movie);
}));
exports.createMovie = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, category, year, duration, director } = req.body;
    const createdMovie = yield moviesService.createMovie({
        title,
        category,
        year,
        duration,
        director,
    });
    moviesCache.delete(const_1.CACHE_KEYS.ALL_MOVIES);
    res.status(http_status_1.default.CREATED).send(createdMovie);
}));
exports.updateMovie = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId } = req.params;
    const { title, category, year, duration, director } = req.body;
    const updatedMovie = yield moviesService.updateMovie(movieId, {
        title,
        category,
        year,
        duration,
        director,
    });
    if (!updatedMovie) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Movie not found');
    }
    moviesCache.delete(const_1.CACHE_KEYS.ALL_MOVIES);
    res.status(http_status_1.default.OK).send(updatedMovie);
}));
exports.deleteMovie = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { movieId } = req.params;
    const deletedMovie = yield moviesService.deleteMovie(movieId);
    if (!deletedMovie) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Movie not found');
    }
    moviesCache.delete(const_1.CACHE_KEYS.ALL_MOVIES);
    res.status(http_status_1.default.NO_CONTENT).send();
}));
exports.aggregateByDirector = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const movies = yield moviesService.aggregateByDirector();
    res.status(http_status_1.default.OK).send({ movies });
}));
exports.aggregateByDates = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, to } = req.query;
    const movies = yield moviesService.aggregateByDates({
        from: Number(from),
        to: Number(to),
    });
    res.status(http_status_1.default.OK).send({ movies });
}));
