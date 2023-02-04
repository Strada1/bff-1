const {Router} = require('express');
const {PATHS} = require('../constants');
const {getAllMovies, addMovie, updateMovie, deleteMovie} = require('../service/db/moviesService');

const router = Router();

router.get(PATHS.MOVIES.ALL, async (req, res) => {
  try {
    const allMovies = await getAllMovies();
    return res.status(200).json(allMovies);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post(PATHS.MOVIES.ALL, async (req, res) => {
  try {
    if (!req.body) {
      return req.status(400).send('wrong request body');
    }
    await addMovie(req.body);
    return res.status(201).send('movie created');
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put(PATHS.MOVIES.BY_ID, async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send('wrong request body!');
    }
    await updateMovie(req.params['movieId'], req.body);
    return res.status(201).send('movie updated');
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete(PATHS.MOVIES.BY_ID, async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send('wrong request body!');
    }
    await deleteMovie(req.params['movieId']);
    return res.status(201).send('movie deleted');
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
