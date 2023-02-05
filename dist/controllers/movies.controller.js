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
exports.deleteMovie = exports.updateMovie = exports.createMovie = exports.getMovie = exports.getMovies = void 0;
const http_status_1 = __importDefault(require("http-status"));
const moviesService = __importStar(require("../services/movies.service"));
const helpers_1 = require("../shared/helpers");
function getMovies(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { populatedFields } = req.query;
            const movies = yield moviesService.getMovies((0, helpers_1.convertQueryToArray)(populatedFields));
            res.status(http_status_1.default.OK).send({ movies });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getMovies = getMovies;
function getMovie(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { movieId } = req.params;
            const { populatedFields } = req.query;
            const movie = yield moviesService.getMovie(movieId, (0, helpers_1.convertQueryToArray)(populatedFields));
            res.status(http_status_1.default.OK).send(movie);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.getMovie = getMovie;
function createMovie(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const createdMovie = yield moviesService.createMovie(req.body);
            res.status(http_status_1.default.CREATED).send(createdMovie);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.createMovie = createMovie;
function updateMovie(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { movieId } = req.params;
            const updatedMovie = yield moviesService.updateMovie(movieId, req.body);
            res.status(http_status_1.default.OK).send(updatedMovie);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.updateMovie = updateMovie;
function deleteMovie(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { movieId } = req.params;
            yield moviesService.deleteMovie(movieId);
            res.status(http_status_1.default.NO_CONTENT).send();
        }
        catch (error) {
            next(error);
        }
    });
}
exports.deleteMovie = deleteMovie;
