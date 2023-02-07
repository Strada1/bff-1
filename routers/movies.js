const express = require('express');
const router = express.Router();
const {
  getMovies,
  createMovie,
  updateMovie,
  deliteMovie,
} = require('../services/movieService.js');
const { body } = require('express-validator');
const validateParams = require('../middlewares/validate.js');

router.get('/', async (req, res) => {
  try {
    const movies = await getMovies();
    return res.status(200).json(movies);
  } catch (e) {
    return res.status(500).send(`Internal server error: ${e.message}`);
  }
});

router.post(
  '/',
  validateParams([body(['title', 'year', 'rating', 'duration']).notEmpty()]),
  async (req, res) => {
    try {
      await createMovie(req.body);
      return res.status(201).send('Movie created');
    } catch (e) {
      return res.status(500).send(`Internal server error: ${e.message}`);
    }
  }
);

router.put(
  '/:movieId',
  validateParams([body(['title', 'year', 'duration']).notEmpty()]),
  async (req, res) => {
    try {
      const result = await updateMovie(req.body.id, req.body);
      if (!result) {
        return res.status(404).send('ID is not found');
      }
      return res.status(200).send('Movie updated');
    } catch (e) {
      return res.status(500).send(`Internal server error: ${e.message}`);
    }
  }
);
router.delete(
  '/:movieId',
  validateParams([body('id').notEmpty()]),
  async (req, res) => {
    try {
      const result = await deliteMovie(req.body.id);
      if (!result) {
        return res.status(404).send('ID is not found');
      }
      return res.status(200).send('Movie delited');
    } catch (e) {
      return res.status(500).send(`Internal server error: ${e.message}`);
    }
  }
);

module.exports = router;
