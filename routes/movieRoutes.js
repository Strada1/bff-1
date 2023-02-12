const express = require('express');
const router = express.Router();
const { findAllMovies, createMovie, findAndDelete, findAndUpdate, findItemById } = require('../services/movieService');
const { validateMovie } = require('../middlewares');
const { moviePostValidatorSchema, movieDeleteValidatorSchema, movieEditValidatorSchema } = require('../validatorSchema/movie');

router.get('/', async (req, res) => {
  const { director, year, sort, onyears } = req.query;
  try {
    const movies = await findAllMovies({ director, year, sort, onyears });
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

router.post('/',
  moviePostValidatorSchema,
  validateMovie,
  async (req, res) => {
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

router.delete('/:movieId',
  movieDeleteValidatorSchema,
  validateMovie,
  async (req, res) => {
    const id = req.params.movieId;
    try {
      const movie = await findAndDelete(id);
      return res.status(201).send('movie deleted');
    } catch (err) {
      return res.status(500).send(err);
    }
  });

router.put('/:movieId/edit',
  movieEditValidatorSchema,
  validateMovie,
  async (req, res) => {
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