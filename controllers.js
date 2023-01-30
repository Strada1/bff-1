const { Movie, Category } = require("./models");

const starting = (req, res) => {
  res.send("Установка соединения прошла успешно");
};

const getMovies = async (req, res) => {
  try {
    const allMovies = await Movie.find({});
    return res.status(200).send(allMovies);
  } catch (error) {
    return res.status(400).send("Формат тела не соответствует шаблону");
  }
};

const postMovies = async (req, res) => {
  try {
    await Movie.create(req.body);
    return res.status(201).send(`movie "${req.body.title}" created`);
  } catch (error) {
    return res.status(400).send("Формат тела не соответствует шаблону");
  }
};

const getCategories = async (req, res) => {
  try {
    const allCategories = await Category.find({});
    return res.status(200).send(allCategories);
  } catch (error) {
    return res.status(400).send(error);
  }
};

const postCategories = async (req, res) => {
  try {
    await Category.create(req.body);
    return res.status(200).send(`Category "${req.body.title}" created`);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  starting,
  getMovies,
  getCategories,
  postMovies,
  postCategories,
};
