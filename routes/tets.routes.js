const express = require('express');
const { validationResult, param, body } = require('express-validator');
const { getDirectorMoviesCount, getMoviesBetweenYears } = require('../controllers/TestController');

const app = express();

const fieldValidators = [
  body('gt').isInt().optional().withMessage('gt must be int'),
  body('lt').isInt().optional().withMessage('lt must be int'),
];

const paramValidator = param('directorId').isMongoId().withMessage('directorId must be MongoId');

const getDirectorForId = app.get('/testing/:directorId', paramValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const countDirector = await getDirectorMoviesCount(req.params.directorId);
    return res.status(200).json(countDirector);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

const getMoviesCount = app.get('/count/movies', ...fieldValidators, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const { gt, lt } = req.body;
    const countMovies = await getMoviesBetweenYears(gt, lt);
    return res.status(200).json(countMovies);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = { getDirectorForId, getMoviesCount };
