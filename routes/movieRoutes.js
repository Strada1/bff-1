const express = require('express');
const app = express();
const { findItem, createMovie, findAndDelete, findAndUpdate, findItemById } = require('../services/movieService');

const getAllMovies = app.get('/movies', async (req, res) => {
  try {
    const movies = await findItem();
    return res.status(201).send(movies);
  } catch (err) {
    return res.status(500).send(err);
  }
});

const AddMovie = app.post('/movies', async (req, res) => {
  try {
    const movie = await createMovie({
      title: req.body.title,
      category: req.body.category,
      year: req.body.year,
      duration: req.body.duration,
      director: req.body.director
    });
    return res.status(201).send('movie created');
  } catch (err) {
    return res.status(500).send(err);
  }
});

const DeleteMovie = app.delete('/movies/:movieId', async (req, res) => {
  const id = req.params.movieId;
  try {
    const movie = await findAndDelete(id);
    return res.status(201).send('movie deleted');
  } catch (err) {
    return res.status(500).send(err);
  }
});

const EditMovie = app.put('/movies/:movieId/edit', async (req, res) => {
  const id = req.params.movieId;
  try {
    const movie = await findAndUpdate(id,
      {
        title: req.body.title,
        category: req.body.category,
        year: req.body.year,
        duration: req.body.duration,
        director: req.body.director
      },
      { new: true });
    return res.status(201).send(movie);
  } catch (err) {
    return res.status(500).send(err);
  }
});

const CommentsMovie = app.post('/movies/:movieId/comments', async (req, res) => {
  const id = req.params.movieId;
  const comment = req.body.comment
  try {
    const movie = await findItemById(id);
    movie.comments.push(comment);
    await movie.save();

    const comments = await findAndUpdate(id,
      {
        comment: movie.comments
      },
      { new: true });
    return res.status(201).send(`comment: "${comment}" added`);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = { getAllMovies, AddMovie, DeleteMovie, EditMovie, CommentsMovie };