const {Router} = require('express');
const {PATHS} = require('../constants');
const {getAllCategories, addCategory, updateCategory, deleteCategory} = require('../service/db/categoriesService');
const validateBodyAndParamsFields = require('../middlewares/validate');

const router = Router();

router.get(PATHS.CATEGORIES.ALL, async (req, res) => {
  try {
    const allCategories = await getAllCategories();
    return res.status(201).json(allCategories);
  } catch (error) {
    return res.status(500).send(error);
  }
});
router.post(PATHS.CATEGORIES.ALL, validateBodyAndParamsFields(['title'], []), async (req, res) => {
  try {
    await addCategory(req.body);
    return res.status(201).send('category added');
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put(PATHS.CATEGORIES.BY_ID, validateBodyAndParamsFields(['title'], ['categoryId']), async (req, res) => {
  try {
    await updateCategory(req.params['categoryId'], req.body);
    return res.status(201).send('category updated!');
  } catch (error) {
    res.status(500).send(error);
  }
});
router.delete(PATHS.CATEGORIES.BY_ID, validateBodyAndParamsFields([], ['categoryId']), async (req, res) => {
  try {
    await deleteCategory(req.params['categoryId']);
    return res.status(201).send('category deleted!');
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
