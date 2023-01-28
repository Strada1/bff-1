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
exports.deleteMovie = exports.editMovie = exports.createMovie = exports.getMovies = void 0;
const http_status_1 = __importDefault(require("http-status"));
const Movie_model_1 = require("../models/Movie.model");
function getMovies(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.status(http_status_1.default.OK).send({ movies: [] });
        }
        catch (error) {
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send({});
        }
    });
}
exports.getMovies = getMovies;
function createMovie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, category } = req.body;
            if (!title || !category) {
                return res
                    .status(http_status_1.default.BAD_REQUEST)
                    .send({ meta: 'required fields are missing' });
            }
            const createdMovie = yield Movie_model_1.Movie.create(req.body);
            res.status(http_status_1.default.CREATED).send(createdMovie);
        }
        catch (error) {
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send({});
        }
    });
}
exports.createMovie = createMovie;
function editMovie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.status(http_status_1.default.OK).send({});
        }
        catch (error) {
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send({});
        }
    });
}
exports.editMovie = editMovie;
function deleteMovie(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.status(http_status_1.default.NO_CONTENT).send({});
        }
        catch (error) {
            res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send({});
        }
    });
}
exports.deleteMovie = deleteMovie;
