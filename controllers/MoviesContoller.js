const { MovieModal } = require('../models/Movies');

const createMovie = async (req, res) => {
  try {
    const doc = new MovieModal({
      title: req.body.title,
      year: req.body.year,
      rating: req.body.rating,
    });

    await MovieModal.create(doc); // добавляем документ

    return res.status(201).json({
      message: 'Movies created',
    }); // возвращаем ответ
  } catch (err) {
    return res.status(500).send(err);
  }
};

const getAllMovies = async (req, res) => {
  try {
    const allMovies = await MovieModal.find();
    return res.status(200).json(allMovies);
  } catch (err) {
    return res.status(500).send(err);
  }
};
const removeMovie = (req, res) => {
  try {
    const movieId = req.params.id;

    return MovieModal.findOneAndDelete({ _id: movieId }, (err, doc) => {
      if (err) {
        return res.status(500).json({
          message: 'Не удалось удалить фильм',
        });
      }
      if (!doc) {
        return res.status(400).json({
          message: 'Не удолось найти фильм',
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
  getAllMovies,
  createMovie,
  removeMovie,
};
