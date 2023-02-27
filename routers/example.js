const {Router} = require('express');
const {body, param} = require('express-validator');
const {PATHS} = require('../constants');
const {getMoviesCountByDirector, getMoviesCountByYearsInterval} = require('../controllers/example');
const validate = require('../middlewares/validate');

const router = Router();

router.get(
  PATHS.MOVIES.MOVIES_COUNT_BY_DIRECTOR_ID,
  [param('directorId').notEmpty().withMessage('directorId is required param')],
  validate,
  getMoviesCountByDirector
);

router.get(
  PATHS.MOVIES.MOVIES_COUNT_BY_YEAR_INTERVAL,
  [
    body('startYear').notEmpty().withMessage('startYear is required param'),
    body('endYear').notEmpty().withMessage('endYear is required param'),
  ],
  validate,
  getMoviesCountByYearsInterval
);
module.exports = router;
