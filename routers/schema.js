const {Router} = require('express');
const {PATHS, INFO_MSG} = require('../constants');
const movies = require('../models/Movies');
const categories = require('../models/Categories');

const router = Router();

router.post(PATHS.SCHEMA.CATEGORIES, (req, res) => {
  try {
    const {field, type} = req.body;
    res.status(200).send(INFO_MSG.FIELD_IS_CREATED);
  } catch (error) {
    return res.status(400).send(INFO_MSG.FIELD_IS_NOT_CREATED);
  }
});
router.post(PATHS.SCHEMA.MOVIES, (req, res) => {
  try {
    const {field, type} = req.body;
    res.status(200).send(INFO_MSG.FIELD_IS_CREATED);
  } catch (error) {
    return res.status(400).send(INFO_MSG.FIELD_IS_NOT_CREATED);
  }
});

router.delete(PATHS.SCHEMA.CATEGORIES, (req, res) => {
  try {
    const {field} = req.body;
    res.status(200).send(INFO_MSG.FIELD_IS_DELETED);
  } catch (error) {
    return res.status(400).send(INFO_MSG.FIELD_IS_NOT_DELETED);
  }
});
router.delete(PATHS.SCHEMA.MOVIES, (req, res) => {
  try {
    const {field} = req.body;
    res.status(200).send(INFO_MSG.FIELD_IS_DELETED);
  } catch (error) {
    return res.status(400).send(INFO_MSG.FIELD_IS_NOT_DELETED);
  }
});

module.exports = router;
