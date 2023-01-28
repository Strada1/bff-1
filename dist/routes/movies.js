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
Object.defineProperty(exports, "__esModule", { value: true });
exports.moviesRoute = void 0;
const express_1 = require("express");
const Movie_1 = require("../models/Movie");
const router = (0, express_1.Router)();
exports.moviesRoute = router;
router.get('/movies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('get movies');
}));
router.post('/movies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, category, year, duration, director } = req.body;
        const movie = yield Movie_1.Movie.create({
            title,
            category,
            year,
            duration,
            director,
        });
        res.status(201).send(movie);
    }
    catch (error) {
        console.log(error);
        res.status(400).send({});
    }
}));
router.put('/movies/:movieId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('put movies');
}));
router.delete('/movies/:movieId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { movieId } = request.params;
    res.send('delete movies');
}));
