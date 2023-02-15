const { Router } = require('express');
const {
  createMovie, getAllMovies, removeMovie, updateMovie,
} = require('../controllers/MoviesContoller');
const { handleValidationErrors } = require('../middleware/handleValidationErrors');
const { movieCreateValidation } = require('../validation/validation');

const router = Router();

router
  .get('/movies', getAllMovies)
  .post(
    '/movies',
    movieCreateValidation,
    handleValidationErrors,
    createMovie,
  )
  .put('/movies/:id', updateMovie)
  .delete('/movies/:id', removeMovie);

module.exports = router;
