const {Router} = require('express');
const {PATHS} = require('../constants');
const Categories = require('../models/Categories');

const router = Router();

router.get(PATHS.CATEGORIES, async (req, res) => {
  try {
    const allCategories = await Categories.find({});
    // !req.body error handler
    return res.status(200).json(allCategories);
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.post(PATHS.CATEGORIES, async (req, res) => {
  try {
    await Categories.create(req.body);
    // !req.body error handler
    return res.status(200).send('category added');
  } catch (error) {
    return res.status(500).send(error);
  }
});

// router.put();
// router.delete();

module.exports = router;
