const express = require("express")
const { getAllCategories, addCategory } = require("../services/categoryService");
const { removeDirector, updateDirector } = require("../services/directorService");
const app = express()

const showCategories = app.get('/categories', async (req, res) => {
  try {
    const allCategories = await getAllCategories()
    return res.status(200).json(allCategories);
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const createCategory = app.post('/categories', async (req, res) => {
  try {
    if (!req.body) return res.status(400).send('Category not created!');
    const category = await addCategory(req.body);
    return res.status(201).send('Category created');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const deleteCategory = app.delete('categories/:categoryId', async (req, res) => {
  try {
    if (!req.body && !req.params.categoryId) return res.status(400).send('Category not deleted!');
    const id = req.params.categoryId;
    await removeDirector(id)
    return res.status(201).send('Category deleted.');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const changeCategory = app.put('categories/:categoryId', async (req, res) => {
  try {
    if (!req.body && req.params.categoryId) return res.status(400).send('Category not change!');
    const id = req.params.categoryId;
    await updateDirector(id, req.body)
    return res.status(201).send('Category change.');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

module.exports = { createCategory, showCategories, deleteCategory, changeCategory };