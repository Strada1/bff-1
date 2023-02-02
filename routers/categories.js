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
      return req.status(400).send('wrong JSON');
    }
    await Categories.create(req.body);
    return res.status(201).send('category added');
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put('/categories/:categoryId', async (req, res) => {
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
// router.delete();

module.exports = router;
