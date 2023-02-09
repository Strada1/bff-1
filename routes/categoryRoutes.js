const express = require('express');
const router = express.Router();
const { findAllCategories, createCategory, findItemById, findAndDelete, findAndUpdate } = require('../services/categoryService');
const { validateCategory } = require('../middlewares');
const { categoryPostValidatorSchema, categoryDeleteValidatorSchema, categoryEditValidatorSchema } = require('../validatorSchema/category');

router.get('/', async (req, res) => {
  try {
    const categories = await findAllCategories();
    return res.status(201).send(categories);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get('/:categoryId', async (req, res) => {
  const id = req.params.categoryId;
  try {
    const category = await findItemById(id);
    return res.status(201).send(category);
  } catch (err) {
    return res.status(500).send(err);
  }
});


router.post('/',
  categoryPostValidatorSchema,
  validateCategory,
  async (req, res) => {
    try {
      const category = await createCategory({
        title: req.body.title,
      });
      return res.status(201).send('category created');
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err);
    }
  });

router.delete('/:categoryId',
  categoryDeleteValidatorSchema,
  validateCategory,
  async (req, res) => {
    const id = req.params.categoryId;
    try {
      const category = await findAndDelete(id);
      return res.status(201).send('category deleted');
    } catch (err) {
      return res.status(500).send(err);
    }
  });

router.put('/:categoryId/edit',
  categoryEditValidatorSchema,
  validateCategory,
  async (req, res) => {
    const id = req.params.categoryId;
    try {
      const category = await findAndUpdate(id,
        {
          title: req.body.title,
        },
        { new: true });
      return res.status(201).send(category);
    } catch (err) {
      return res.status(500).send(err);
    }
  });


module.exports = router;