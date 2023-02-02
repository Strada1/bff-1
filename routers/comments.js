const {Router} = require('express');
const {PATHS} = require('../constants');
const Movies = require('../models/Movies');

const router = Router();

router.get(PATHS.COMMENTS.ALL, async (req, res) => {
  try {
    const movieId = req.params['movieId'];
    const movie = await Movies.findById(movieId);
    const comments = movie.comments;
    res.status(201).json(comments);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post(PATHS.COMMENTS.ALL, async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send('wrong request body');
    }
    const {comment} = req.body;
    const movieId = req.params['movieId'];
    const movie = await Movies.findById(movieId);
    movie.comments.push(comment);
    await movie.save();
    res.status(201).send('comment added');
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
