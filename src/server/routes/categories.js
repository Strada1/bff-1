const express = require("express")
const { getAllCategories, addCategory, removeCategory, updateCategory } = require("../services/categoryService");
const { validationResult, body, param } = require('express-validator');
const { validate } = require("../middlewares");
const app = express()

const fieldValidator = body('title').matches(/[a-zA-Zа-яА-Я]/).trim().optional().withMessage('title must contain only letters');

const paramValidator = param('categoryId').isMongoId().withMessage('categoryId must be MongoId');

const showCategories = app.get('/categories', async (req, res) => {
  try {
    const { sort } = req.query
    const allCategories = await getAllCategories(sort)
    return res.status(200).json(allCategories);
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const createCategory = app.post('/categories', validate(['title']), fieldValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    await addCategory(req.body);
    return res.status(201).send('Category created');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const deleteCategory = app.delete('/categories/:categoryId', paramValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    await removeCategory(req.params.categoryId)
    return res.status(201).send('Category deleted.');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const changeCategory = app.put('/categories/:categoryId', validate(['title']), fieldValidator, paramValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    await updateCategory(req.params.categoryId, req.body)
    return res.status(201).send('Category change.');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

module.exports = { createCategory, showCategories, deleteCategory, changeCategory };