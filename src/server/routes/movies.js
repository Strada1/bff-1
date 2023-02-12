const express = require("express")
const { removeMovie, addMovie, updateMovie, getAllMovies } = require("../services/movieService");
const { validationResult, body, param  } = require("express-validator");
const { validate } = require("../middlewares");
const app = express()
const NodeCache = require("node-cache");
const movieCache = new NodeCache( { stdTTL: 3600 } )

const paramValidator = param('movieId').isMongoId().withMessage('movieId must be MongoId');

const fieldValidators = [
  body('title').matches(/[a-zA-Zа-яА-Я0-9]/).trim().optional().withMessage('title must contain only letters or numbers'),
  body('year').isInt().optional().withMessage('year must be int'),
  body('directorId').isMongoId().optional().withMessage('directorId must be MongoId')
]

const showMovies = app.get('/movies', async (req, res) => {
  try {
    if (Object.keys(req.query).length === 0 && movieCache.has('movies')) {
      return res.status(200).send(movieCache.get('movies'));
    } else {
      const allMovies = await getAllMovies(req.query);
      movieCache.set('movies', allMovies)
      return res.status(200).send(allMovies);
    }
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const createMovie = app.post("/movies", ...fieldValidators, validate(['title, directorId, year']), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    movieCache.del('movies')
    await addMovie(req.body);
    return res.status(201).send('Movie created');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const deleteMovie = app.delete('/movies/:movieId', paramValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    movieCache.del('movies')
    await removeMovie(req.params.movieId)
    return res.status(201).send('Movie deleted.');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const changeMovie = app.put('/movies/:movieId', validate(['title, directorId, year']), paramValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    movieCache.del('movies')
    await updateMovie(req.params.movieId, req.body)
    return res.status(201).send('Movie change.');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

module.exports = { createMovie, showMovies, changeMovie, deleteMovie };