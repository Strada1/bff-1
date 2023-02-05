  const express = require("express")
const { getAllCategories, addCategory } = require("../services/categoryService");
const app = express()

const showCategories = app.get('/categories', async (req, res) => {
  try {
    const allCategories = await getAllCategories()
    return res.status(200).json(allCategories);
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const createCategory = app.post("/categories", async (req, res) => {
  try {
    if (!req.body) return res.status(400).send('Category not created!');
    await addCategory(req.body);
    return res.status(201).send('Category created');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

module.exports = { createCategory, showCategories };