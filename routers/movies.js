const {Router} = require('express');
const {PATHS} = require('../constants');
const {getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie} = require('../service/db/moviesService');
const validateBodyAndParamsFields = require('../middlewares/validate');

const router = Router();

router.get(PATHS.MOVIES.ALL, async (req, res) => {
  try {
    const allMovies = await getAllMovies();
    return res.status(200).json(allMovies);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get(PATHS.MOVIES.BY_ID, validateBodyAndParamsFields([], ['movieId']), async (req, res) => {
  try {
    const movie = await getMovieById(req.params['movieId']);
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post(PATHS.MOVIES.ALL, validateBodyAndParamsFields(['title', 'year'], []), async (req, res) => {
  try {
    await addMovie(req.body);
    return res.status(201).send('movie created');
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put(PATHS.MOVIES.BY_ID, validateBodyAndParamsFields(['title', 'year'], ['movieId']), async (req, res) => {
  try {
    await updateMovie(req.params['movieId'], req.body);
    return res.status(201).send('movie updated');
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete(PATHS.MOVIES.BY_ID, validateBodyAndParamsFields(['title', 'year'], ['movieId']), async (req, res) => {
  try {
    await deleteMovie(req.params['movieId']);
    return res.status(201).send('movie deleted');
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
