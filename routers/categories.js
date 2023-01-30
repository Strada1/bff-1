const express = require('express');
const Category = require('../models/category.js');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    await Category.create(req.body);
    return res.status(201).send('category adding');
  } catch (e) {
    return res.status(500).send('Internal server error');
  }
});

module.exports = router;
