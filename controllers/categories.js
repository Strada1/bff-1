const categoriesService = require('../service/db/categoriesService');

const getCategories = async (req, res) => {
  try {
    const allCategories = await categoriesService.getAllCategories(req.query['sortBy']);
    return res.status(200).json(allCategories);
  } catch (error) {
    return res.status(500).send(error);
  }
};
const addCategory = async (req, res) => {
  try {
    await categoriesService.addCategory(req.body);
    return res.status(201).send('category added');
  } catch (error) {
    return res.status(500).send(error);
  }
};
const updateCategory = async (req, res) => {
  try {
    await categoriesService.updateCategory(req.params['categoryId'], req.body);
    return res.status(201).send('category updated!');
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteCategory = async (req, res) => {
  try {
    await categoriesService.deleteCategory(req.params['categoryId']);
    return res.status(201).send('category deleted!');
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
