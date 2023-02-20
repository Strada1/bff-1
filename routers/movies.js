const {Router} = require('express');
const {body, param} = require('express-validator');
const {PATHS} = require('../constants');
const {getMovies, getMovie, addMovie, updateMovie, deleteMovie} = require('../controllers/movies');
const {getCache} = require('../middlewares/cache');
const validate = require('../middlewares/validate');

const router = Router();

router.use(getCache);
router.get(PATHS.MOVIES.ALL, validate, getMovies);

router.get(
  PATHS.MOVIES.BY_ID,
  [param('movieId').notEmpty().withMessage('movieId is required param')],
  validate,
  getMovie
);

router.post(
  PATHS.MOVIES.ALL,
  [
    body('title').notEmpty().withMessage('the title field should not be empty'),
    body('year').notEmpty().withMessage('the year field should not be empty'),
  ],
  validate,
  addMovie
);

router.put(
  PATHS.MOVIES.BY_ID,
  [
    body('title').notEmpty().withMessage('the title field should not be empty'),
    body('year').notEmpty().withMessage('the year field should not be empty'),
    param('movieId').notEmpty().withMessage('movieId is required param'),
  ],
  validate,
  updateMovie
);

router.delete(
  PATHS.MOVIES.BY_ID,
  [param('movieId').notEmpty().withMessage('movieId is required param')],
  validate,
  deleteMovie
);

module.exports = router;
