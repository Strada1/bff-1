const express = require('express');
const router = express.Router();
const {
  getCategories,
  createCategory,
  updateCategory,
  deliteCategory,
} = require('../services/categoryService.js');
const { body } = require('express-validator');
const validateParams = require('../middlewares/validate.js');

router.get('/', async (req, res) => {
  try {
    const categories = await getCategories();
    return res.status(200).json(categories);
  } catch (e) {
    return res.status(500).send(`Internal server error: ${e.message}`);
  }
});

router.post(
  '/',
  validateParams([body('title').notEmpty()]),
  async (req, res) => {
    try {
      await createCategory(req.body);
      return res.status(201).send('Category adding');
    } catch (e) {
      return res.status(500).send(`Internal server error: ${e.message}`);
    }
  }
);

router.put(
  '/:categoryId',
  validateParams([body(['id', 'title']).notEmpty()]),
  async (req, res) => {
    try {
      const result = await updateCategory(req.body.id, req.body);
      if (!result) {
        return res.status(404).send('Not found ID');
      }
      return res.status(200).send('Category updated');
    } catch (e) {
      return res.status(500).send(`Internal server error: ${e.message}`);
    }
  }
);
router.delete(
  '/:categoryId',
  validateParams([body('id').notEmpty()]),
  async (req, res) => {
    try {
      const result = await deliteCategory(req.body.id);
      if (!result) {
        return res.status(404).send('ID is not found');
      }
      return res.status(200).send('Category delited');
    } catch (e) {
      return res.status(500).send(`Internal server error: ${e.message}`);
    }
  }
);

module.exports = router;
