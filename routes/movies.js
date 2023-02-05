const express = require("express");
const router = express.Router();
const { getMovie, getMovies, createMovie, updateMovie, deleteMovie } = require("../services/movie");

router.route("/")
.get(async (req, res) => {
    try {
        const movies = await getMovies();
        return res.status(200).send(movies);
    } catch (e) {
        return res.status(500).json({error: e, message: "Error when receiving movies"});
    }
})
.post(async (req, res) => {
    try {
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
