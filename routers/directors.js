const {Router} = require('express');
const {PATHS} = require('../constants');
const {body, param} = require('express-validator');
const {getDirectors, addDirector, updateDirector, deleteDirector} = require('../controllers/directors');
const validate = require('../middlewares/validate');

const router = Router();

router.get(PATHS.DIRECTORS.ALL, [], validate, getDirectors);

router.post(
  PATHS.DIRECTORS.ALL,
  [
    body('firstName').notEmpty().withMessage('the firstName field should not be empty'),
    body('lastName').notEmpty().withMessage('the lastName field should not be empty'),
  ],
  validate,
  addDirector
);

router.put(
  PATHS.DIRECTORS.BY_ID,
  [
    body('firstName').notEmpty().withMessage('the firstName field should not be empty'),
    body('lastName').notEmpty().withMessage('the lastName field should not be empty'),
    param('directorId').notEmpty().withMessage('directorId is required param'),
  ],
  validate,
  updateDirector
);

router.delete(
  PATHS.DIRECTORS.BY_ID,
  [param('directorid').notEmpty().withMessage('directorid is required param')],
  validate,
  deleteDirector
);

module.exports = router;
