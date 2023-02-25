const express = require("express")
const {
  removeMovie,
  addMovie,
  updateMovie,
  getAllMovies,
  addMovieToFavorites,
  deleteMovieFromFavorites
} = require("../services/movieService");
const { validationResult, body, param } = require("express-validator");
const { validate, checkIsAdmin } = require("../middlewares");
const app = express()
const NodeCache = require("node-cache");
const { getUserByToken } = require("../services/userService");
const passport = require("passport");
const movieCache = new NodeCache({ stdTTL: 3600 })

const paramValidator = param('movieId').isMongoId().withMessage('movieId must be MongoId');

const fieldValidators = [
  body('title').matches(/[a-zA-Zа-яА-Я0-9]/).trim().optional().withMessage('title must contain only letters or numbers'),
  body('year').isInt().optional().withMessage('year must be int'),
  body('directorId').isMongoId().optional().withMessage('directorId must be MongoId')
]

const showMovies = app.get('/movies',
  passport.authenticate('bearer', { session: false }),
  async (req, res) => {
    try {

      const hasQueryParams = Object.keys(req.query).length > 0
      const hasCache = movieCache.has('movies')

      if (hasQueryParams) {
        const allMovies = await getAllMovies(req.query);
        return res.status(200).send(allMovies);
      }

      if (hasCache) {
        return res.status(200).send(movieCache.get('movies'));
      }

      const allMovies = await getAllMovies(req.query);
      movieCache.set('movies', allMovies)
      return res.status(200).send(allMovies);
    } catch (e) {
      return res.status(500).send(e.message);
    }
  })

const createMovie = app.post("/movies",
  passport.authenticate('bearer', { session: false }),
  ...fieldValidators,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      const token = req?.headers?.authorization?.split(' ')[1];
      const permission = await getUserByToken(token)

      if (!permission) {
        return res.status(403).send('You don\'t have permission');
      }

      movieCache.del('movies')
      const movie = await addMovie(req.body);
      return res.status(201).send(movie);

    } catch (e) {
      return res.status(500).send(e.message);
    }
  })

const deleteMovie = app.delete('/movies/:movieId',
  passport.authenticate('bearer', { session: false }),
  checkIsAdmin,
  paramValidator,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      movieCache.del('movies')
      const movie = await removeMovie(req.params.movieId)
      return res.status(201).send(movie);

    } catch (e) {
      return res.status(500).send(e.message);
    }
  })

const changeMovie = app.put('/movies/:movieId',
  passport.authenticate('bearer', { session: false }),
  ...fieldValidators,
  checkIsAdmin,
  paramValidator,
  async (req, res) => {
    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      movieCache.del('movies')
      const movie = await updateMovie(req.params.movieId, req.body)
      return res.status(201).send(movie);
    } catch (e) {
      return res.status(500).send(e.message);
    }
  })

const addMovieToFavorite = app.patch('/movies/:movieId/add_favorite',
  passport.authenticate('bearer', { session: false }),
  paramValidator,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      const token = req?.headers?.authorization?.split(' ')[1];
      const user = await getUserByToken(token)

      await addMovieToFavorites(user._id, req.params.movieId);
      return res.status(201).send('Movie added to favorites')
    } catch (e) {
      console.log(e)
      return res.status(500).send(e.message);
    }
  })
const deleteMovieFromFavorite = app.patch('/movies/:movieId/delete_favorite',
  passport.authenticate('bearer', { session: false }),
  paramValidator,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      const token = req?.headers?.authorization?.split(' ')[1];
      const user = await getUserByToken(token)

      await deleteMovieFromFavorites(user._id, req.params.movieId)
      return res.status(201).send('Movie removed from favorites')
    } catch (e) {
      console.log(e)
      return res.status(500).send(e.message);
    }
  })

module.exports = { createMovie, showMovies, changeMovie, deleteMovie, addMovieToFavorite, deleteMovieFromFavorite };