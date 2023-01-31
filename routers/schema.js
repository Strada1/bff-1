const {Router} = require('express');
const {PATHS, INFO_MSG} = require('../constants');
const {movies, MoviesSchema} = require('../models/Movies');
const {categories, CategoriesSchema} = require('../models/Categories');

const router = Router();

router.post(PATHS.SCHEMA.CATEGORIES, async (req, res) => {
  try {
    const field = req.body;
    await CategoriesSchema.add(field);
    res.status(200).send(INFO_MSG.FIELD_IS_CREATED);
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.post(PATHS.SCHEMA.MOVIES, async (req, res) => {
  try {
    const field = req.body;
    await MoviesSchema.add(field);
    res.status(200).send(INFO_MSG.FIELD_IS_CREATED);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete(PATHS.SCHEMA.CATEGORIES, async (req, res) => {
  try {
    const {field} = req.body;
    await CategoriesSchema.remove(field);
    res.status(200).send(INFO_MSG.FIELD_IS_DELETED);
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.delete(PATHS.SCHEMA.MOVIES, async (req, res) => {
  try {
    const {field} = req.body;
    await MoviesSchema.remove(field);
    res.status(200).send(INFO_MSG.FIELD_IS_DELETED);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
