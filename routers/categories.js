const {Router} = require('express');
const {PATHS} = require('../constants');
const Categories = require('../models/Categories');

const router = Router();

router.get(PATHS.CATEGORIES, async (req, res) => {
  try {
    const allCategories = await Categories.find({});
    return res.status(201).json(allCategories);
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.post(PATHS.CATEGORIES, async (req, res) => {
  try {
    if (!req.body) {
      return req.status(400).send('wrong request body');
    }
    await Categories.create(req.body);
    return res.status(201).send('category added');
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put(PATHS.CATEGORIES.BY_ID, async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).send('wrong request body!');
    }
    const categoryId = req.params['categoryId'];
    const category = req.body;
    await Categories.findByIdAndUpdate(categoryId, category);
    return res.status(201).send('category updated!');
  } catch (error) {
    res.status(500).send(error);
  }
});
router.delete(PATHS.CATEGORIES.BY_ID, async (req, res) => {
  try {
    const categoryId = req.params['categoryId'];
    await Categories.findByIdAndDelete(categoryId);
    return res.status(201).send('category deleted!');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
