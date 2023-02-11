const express = require('express');
const router = express.Router();
const { aggregateDirectorMoviesCount, agregateMoviesForYears, aggregateMoviesForYearsByDirectors } = require('../services/movieService');

router.get('/:directorId/movie', async (req, res) => {
  const directorId = req.params.directorId;
  try {
    const count = await aggregateDirectorMoviesCount(directorId);

    return res.status(201).send(count);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/count', async (req, res) => {
  greaterThan = req.body.greaterThan,
  lowerThan = req.body.lowerThan
  try {
    const countMovies = await agregateMoviesForYears(greaterThan, lowerThan);
    return res.status(201).send(countMovies);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/countdirectors', async (req, res) => {
  greaterThan = req.body.greaterThan,
  lowerThan = req.body.lowerThan
  try {
    const countMovies = await aggregateMoviesForYearsByDirectors(greaterThan, lowerThan);
    return res.status(201).send(countMovies);
  } catch (err) {
    return res.status(500).send(err);
  }
});


module.exports = router;