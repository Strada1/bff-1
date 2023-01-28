const CategoryModel = require("../models/category");
const express = require("express");
const app = express();

const createCategory = app.post("/categories", async (req, res) => {
  try {
    await CategoryModel.create({
      title: req.body.title,
    });

    return res.status(201).send("category created");
  } catch (e) {
    return res.status(500).send("error " + e);
  }
});

module.exports = createCategory;
