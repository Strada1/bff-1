const express = require('express');
const router = express.Router();
const NodeCache = require('node-cache');
const { findAllMovies, createMovie, findAndDelete, findAndUpdate, findItemById } = require('../services/movieService');
const { validateMovie } = require('../middlewares');
const { moviePostValidatorSchema, movieDeleteValidatorSchema, movieEditValidatorSchema } = require('../validatorSchema/movie');
const myCache = new NodeCache({ stdTTL: 3600 });

router.get('/', async (req, res) => {
  const { director, year, sort, onyears } = req.query;
  const cacheKey = `${director}:${year?.toString()}:${sort?.toString()}:${onyears?.toString()} `
  try {
    let allMovies = myCache.get(cacheKey);
    if (!allMovies) {
      allMovies = await findAllMovies({ director, year, sort, onyears });
      myCache.set(cacheKey, allMovies);
    }
    return res.status(201).send(allMovies);
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
      myCache.flushAll();
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
      myCache.flushAll();
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
      myCache.flushAll();
      return res.status(201).send(movie);
    } catch (err) {
      return res.status(500).send(err);
    }
  });


module.exports = router;