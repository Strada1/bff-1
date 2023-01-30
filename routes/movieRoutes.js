const express = require('express');
const app = express();
const MovieModel = require('../models/movieModel');

// Роут на добавление
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

  module.exports = CreateMovie;