const MovieModel = require('../models/movie')
const express = require("express")
const app = express()

const showMovies = app.get('/movies', async (req, res) => {
  try {
    const allMovies = await MovieModel.find()
    return res.status(200).json(allMovies);
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const createMovie = app.post("/movies", async (req, res) => {
  try {
    await MovieModel.create(req.body);
    if (!req.body) return res.status(400).send('Movie not created!');
    return res.status(201).send('Movie created');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const deleteMovie = app.delete('/movies', async (req, res) => {
  try {
    if (!req.body) return res.status(400).send('Movie not deleted!');
    await MovieModel.findOneAndDelete(req.body.id)
    return res.status(201).send('Movie deleted.');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const changeMovie = app.put('/movies', async (req, res) => {
  try {
    if (!req.body) return res.status(400).send('Movie not change!');
    const filter = {
      _id: req.body.id
    };
    const update = {
      title: req.body.title,
      year: req.body.year,
      movie: req.body.movie,
      duration: req.body.duration,
      director: req.body.director,
    };
    await MovieModel.findOneAndUpdate(filter, update, { new: true });
    return res.status(201).send('Movie change.');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

module.exports = { createMovie, showMovies, changeMovie, deleteMovie };