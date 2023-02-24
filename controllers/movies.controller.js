const NodeCache = require('node-cache');
const { MovieModal } = require('../models/Movies');
const MoviesService = require('../services/movies.service');

const movieCache = new NodeCache({ stdTTL: 5000 });

class MoviesController {
  async createMovie(req, res) {
    try {
      const doc = new MovieModal({
        title: req.body.title,
        year: req.body.year,
        rating: req.body.rating,
        director: req.body.director,
      });

      await MovieModal.create(doc);
      movieCache.del('movies');
      return res.status(201).json({
        message: 'Movies created',
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  async getAllMovies(req, res) {
    try {
      const hasQueryParams = Object.entries(req.query).length > 0;

      if (hasQueryParams) {
        const allMovies = await MoviesService.getAllMovies(req.query);
        return res.status(200).send(allMovies);
      }

      if (movieCache.has('movies')) {
        return res.status(200).json(movieCache.get('movies'));
      }

      const allMovies = await MoviesService.getAllMovies(req.query);
      movieCache.set('movies', allMovies);
      return res.status(200).json(allMovies);
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  async updateMovie(req, res) {
    try {
      const movieId = req.params.id;
      const update = {
        title: req.body.title,
        rating: req.body.rating,
        year: req.body.year,
      };

      const doc = await MovieModal.findOneAndUpdate({ _id: movieId }, update, { new: true });

      if (!doc) {
        return res.status(400).json({
          message: 'Не удолось найти фильм',
        });
      }
      movieCache.del('movies');
      return res.json(doc);
    } catch (err) {
      return res.status(500).send(err);
    }
  }

  async removeMovie(req, res) {
    try {
      const movieId = req.params.id;

      return await MovieModal.findOneAndDelete({ _id: movieId }, (err, doc) => {
        if (err) {
          return res.status(500).json({
            message: 'Не удалось удалить фильм',
          });
        }
        if (!doc) {
          return res.status(400).json({
            message: 'Не удалось найти фильм',
          });
        }

        movieCache.del('movies');
        return res.json({
          success: true,
        });
      });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
}

module.exports = new MoviesController();
