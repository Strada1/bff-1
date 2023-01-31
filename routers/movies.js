const {Router} = require('express');
const {PATHS} = require('../constants');
const Movies = require('../models/Movies');

const router = Router();

router.get(PATHS.MOVIES, async (req, res) => {
  try {
    const allMovies = await Movies.find({});
    // !req.body error handler
    return res.status(200).json(allMovies);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post(PATHS.MOVIES, async (req, res) => {
  try {
    await Movies.create(req.body);
    // !req.body error handler
    return res.status(200).send('movie created');
  } catch (error) {
    return res.status(500).send(error);
  }
});
// router.put();
// router.delete();

module.exports = router;
