const { MovieModal } = require('../models/Movies');

const createMovie = async (req, res) => {
  try {
    const doc = new MovieModal({
      title: req.body.title,
      year: req.body.year,
      rating: req.body.rating,
      director: req.body.director,
    });

    await MovieModal.create(doc);

    return res.status(201).json({
      message: 'Movies created',
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getAllMovies = async (req, res) => {
  try {
    const allMovies = await MovieModal.find().populate('director');
    return res.status(200).json(allMovies);
  } catch (err) {
    return res.status(500).send(err);
  }
};
const updateMovie = async (req, res) => {
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
    return res.json(doc);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const removeMovie = async (req, res) => {
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
      return res.json({
        success: true,
      });
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  createMovie,
  getAllMovies,
  updateMovie,
  removeMovie,
};
