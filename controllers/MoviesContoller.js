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
    const allMovies = await MovieModal.find(); // получаем все документы
    return res.status(200).json(allMovies); // возвращаем ответ
  } catch (err) {
    return res.status(500).send(err);
  }
};
module.exports = {
  getAllMovies,
  createMovie,
};
