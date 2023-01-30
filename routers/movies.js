const express = require('express');
const Movie = require('../models/movies.js');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});

router.post('/', async (req, res) => {
  try {
    await Movie.create(req.body);
    return res.status(201).send('film created');
  } catch (e) {
    return res.status(500).send('Internal server error');
  }
});

module.exports = router;
