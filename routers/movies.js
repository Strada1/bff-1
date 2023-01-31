const {Router} = require('express');
const {PATHS} = require('../constants');
const {movies} = require('../models/Movies');

const router = Router();

router.get(PATHS.MOVIES, (req, res) => {
  res.send('GET request is done.');
});

router.post(PATHS.MOVIES, async (req, res) => {
  try {
    await movies.create(req.body);
    return res.status(201).send('movie created');
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
