const {Router} = require('express');
const {PATHS} = require('../constants');
const Movies = require('../models/Movies');

const router = Router();

router.get(PATHS.MOVIES, async (req, res) => {
  try {
    const allMovies = await Movies.find({});
    return res.status(200).json(allMovies);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post(PATHS.MOVIES, async (req, res) => {
  try {
    if (!req.body) {
      return req.status(400).send('wrong JSON');
    }
    await Movies.create(req.body);
    return res.status(201).send('movie created');
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put('/movies/:movieId', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send('wrong request body!');
    }
    const movieId = req.params['movieId'];
    const movie = req.body;
    await Movies.findByIdAndUpdate({_id: movieId}, movie);
    return res.status(201).send('movie changed');
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete('/movies/:movieId', async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send('wrong request body!');
    }
    const movieId = req.params['movieId'];
    await Movies.findByIdAndDelete(movieId);
    return res.status(201).send('movie deleted');
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
