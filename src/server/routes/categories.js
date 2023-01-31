const CategoryModel = require('../models/category')
const express = require("express")
const app = express()

const createCategory = app.post("/categories", async (req, res) => {
  try {
    await CategoryModel.create(req.body);
    if (!req.body) return res.status(400).send('Category not created!');
    return res.status(201).send('Category created');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

module.exports = { createCategory };