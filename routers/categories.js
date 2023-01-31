const {Router} = require('express');
const {PATHS} = require('../constants');
const {categories} = require('../models/Categories');

const router = Router();

router.get(PATHS.CATEGORIES, (req, res) => {
  res.send('GET request is done.');
});
router.post(PATHS.CATEGORIES, async (req, res) => {
  try {
    await categories.create(req.body);
    return res.status(201).send('category added');
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
