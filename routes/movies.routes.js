const { Router } = require('express');
const {
  createMovie, getAllMovies, removeMovie, updateMovie,
} = require('../controllers/MoviesContoller');

const router = Router();

router
  .get('/movies', getAllMovies)
  .post('/movies', createMovie)
  .put('/movies/:id', updateMovie)
  .delete('/movies/:id', removeMovie);

module.exports = router;
