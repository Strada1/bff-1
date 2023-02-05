const express = require('express');
const router = express.Router();
const { findAllMovies, createMovie, findAndDelete, findAndUpdate, findItemById } = require('../services/movieService');

router.get('/', async (req, res) => {
  try {
    const movies = await findAllMovies();
    return res.status(201).send(movies);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/:movieId', async (req, res) => {
  const id = req.params.movieId;
  try {
    const movie = await findItemById(id).populate('director').populate('category');
    return res.status(201).send(movie);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const movie = await createMovie({
      title: req.body.title,
      categoryId: req.body.category,
      year: req.body.year,
      duration: req.body.duration,
      directorId: req.body.director
    });
    return res.status(201).send('movie created');
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.delete('/:movieId', async (req, res) => {
  const id = req.params.movieId;
  try {
    const movie = await findAndDelete(id);
    return res.status(201).send('movie deleted');
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.put('/:movieId/edit', async (req, res) => {
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


module.exports = router;