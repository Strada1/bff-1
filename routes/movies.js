const express = require("express");
const router = express.Router();
const { getMovie, getMovies, createMovie, updateMovie, deleteMovie } = require("../services/movie");
const { body, validationResult } = require("express-validator");
const db = require("../db.js");

router.route("/")
.get(async (req, res) => {
    try {
        const movies = await getMovies();
        return res.status(200).send(movies);
    } catch (e) {
        return res.status(500).json({error: e, message: "Error when receiving movies"});
    }
})
.post(
    body("title")
        .exists().withMessage("There is no field title")
        .bail()
        .notEmpty().withMessage("The field title is empty"),
    body("directorId")
        .exists().withMessage("There is no field directorId")
        .bail()
        .notEmpty().withMessage("The field directorId is empty")
        .bail()
        .custom((value) => db.Types.ObjectId.isValid(value)).withMessage("The field directorId no valide"),
    body("year")
        .exists().withMessage("There is no field year")
        .bail()
        .notEmpty().withMessage("The field year is empty")
        .isInt().withMessage("Year field not a number"),
    body("duration")
        .exists().withMessage("There is no field duration")
        .bail()
        .notEmpty().withMessage("The field duration is empty")
        .isInt().withMessage("Duration field not a number"),
    body("rating")
        .exists().withMessage("There is no field rating")
        .bail()
        .notEmpty().withMessage("The field rating is empty")
        .isInt().withMessage("Rating field not a number"),
    body("categoryIds")
        .exists().withMessage("There is no field categoryIds")
        .bail()
        .isArray().withMessage("CategoryIds field not a array")
        .bail()
        .isArray({min: 1}).withMessage("The field categoryIds is empty")
        .bail()
        .custom((value) => !value.some((item) => !db.Types.ObjectId.isValid(item))).withMessage("Some of categoryId no valide"),
    async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        const values = req.body;
        await createMovie(values);
        return res.status(201).send("Movies added");
    }
    catch (e) {
        res.status(500).json({error: e, message: "Error when adding a movie"});
    }
});


router.route("/:movieId")
.get(async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const movie = await getMovie(movieId);
        return res.status(200).send(movie);
    } catch (e) {
        return res.status(500).json({error: e, message: "Error when receiving a movie"});
    }
})
.put(async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const values = req.body;
        await updateMovie(movieId, values);
        return res.status(200).send("Movie updated");
    } catch (e) {
        return res.status(500).json({error: e, message: "Error when updating a movie"});
    }
})
.delete(async (req, res) => {
    try {
        const movieId = req.params.movieId;
        await deleteMovie(movieId);
        return res.status(200).send("Movie deleted");
    } catch (e) {
        return res.status(500).json({error: e, message: "Error when deleting a movie"});
    }
});

module.exports = router;
