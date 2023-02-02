const express = require('express');
const app = express();
const MovieModel = require('../models/movieModel');

// Add
const CreateMovie = app.post('/movies', async (req, res) => {
  try {
    const movie = await MovieModel.create({
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

// Delete
const DeleteMovie = app.delete('/movies/:movieId', async (req, res) => {
  const _id = req.params.movieId;
  try {
    const movie = await MovieModel.findByIdAndDelete(_id);
    return res.status(201).send('movie deleted');
  } catch (err) {
    return res.status(500).send(err);
  }
});

// Edit
const EditMovie = app.post('/movies/:movieId/edit', async (req, res) => {
  const _id = req.params.movieId;
  try {
    const movie = await MovieModel.findByIdAndUpdate(_id,
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

// Comments
const CommentsMovie = app.post('/movies/:movieId/comments', async (req, res) => {
  const _id = req.params.movieId;
  const comment = req.body.comment
  try {
    const movie = await MovieModel.findById(_id);
    movie.comments.push(comment);
    await movie.save();

    const comments = await MovieModel.findByIdAndUpdate(_id,
      {
        comment: movie.comments
      },
      { new: true });
    return res.status(201).send(`comment: "${comment}" added`);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = { CreateMovie, DeleteMovie };