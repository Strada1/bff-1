const { Router } = require('express');
const { createMovie, getAllMovies } = require('../controllers/MoviesContoller');

const router = Router();

router
  .get('/movies', getAllMovies)
  .post('/movies', createMovie)
  .put('/movies/:movieId')
  .delete('/movies/:movieId');

module.exports = router;
