const express = require('express');
const app = express();
const { createCategory } = require('../services/categoryService');

const AddCategory = app.post('/category', async (req, res) => {
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

module.exports = AddCategory;