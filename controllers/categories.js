const {validationResult} = require('express-validator');
const categoriesService = require('../service/db/categoriesService');

const getCategories = async (req, res) => {
  try {
    const allCategories = await categoriesService.getAllCategories();
    return res.status(201).json(allCategories);
  } catch (error) {
    return res.status(500).send(error);
  }
};
const addCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    await categoriesService.addCategory(req.body);
    return res.status(201).send('category added');
  } catch (error) {
    return res.status(500).send(error);
  }
};
const updateCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    await categoriesService.updateCategory(req.params['categoryId'], req.body);
    return res.status(201).send('category updated!');
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteCategory = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
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
