const {myCache} = require('../middlewares/cache');
const moviesService = require('../service/db/moviesService');

const getMovies = async (req, res) => {
  try {
    const {query} = req;
    const sortBy = query['sortBy'];
    const filters = query;
    delete filters.sortBy;
    const movies = await moviesService.getAllMovies(filters, sortBy);
    myCache.set(req.originalUrl, movies);
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).send(error);
  }
};
const getMovie = async (req, res) => {
  try {
    const movie = await moviesService.getMovieById(req.params['movieId']);
    return res.status(200).json(movie);
  } catch (error) {
    return res.status(500).send(error);
  }
};
const addMovie = async (req, res) => {
  try {
    await moviesService.addMovie(req.body);
    return res.status(201).send('movie created');
  } catch (error) {
    return res.status(500).send(error);
  }
};
const updateMovie = async (req, res) => {
  try {
    await moviesService.updateMovie(req.params['movieId'], req.body);
    return res.status(201).send('movie updated');
  } catch (error) {
    return res.status(500).send(error);
  }
};
const deleteMovie = async (req, res) => {
  try {
    await moviesService.deleteMovie(req.params['movieId']);
    return res.status(201).send('movie deleted');
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getMovies,
  getMovie,
  addMovie,
  updateMovie,
  deleteMovie,
};
