const express = require("express")
const { removeMovie, addMovie, updateMovie, getAllMovies } = require("../services/movieService");
const app = express()

const showMovies = app.get('/movies', async (req, res) => {
  try {
    const allMovies = await getAllMovies();
    return res.status(200).json(allMovies);
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const createMovie = app.post("/movies", async (req, res) => {
  try {
    if (!req.body) return res.status(400).send('Movie not created!');
    const movie = await addMovie(req.body);
    movie.save();
    return res.status(201).send('Movie created');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const deleteMovie = app.delete('/movies', async (req, res) => {
  try {
    if (!req.body) return res.status(400).send('Movie not deleted!');
    await removeMovie(req.body.id)
    return res.status(201).send('Movie deleted.');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const changeMovie = app.put('/movies', async (req, res) => {
  try {
    if (!req.body) return res.status(400).send('Movie not change!');
    await updateMovie(req.body)
    return res.status(201).send('Movie change.');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

module.exports = { createMovie, showMovies, changeMovie, deleteMovie };