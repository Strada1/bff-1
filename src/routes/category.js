const express = require("express");
const router = express.Router();
const CategoryScheme = require("../models/category");

router.get("/", async (req, res) => {
  try {
    const categoryList = await CategoryScheme.find();
    return res.status(200).send(categoryList);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/add", async (req, res) => {
  try {
    const { title } = req.body;
    const createdCategory = await CategoryScheme.create({ title });
    return res.status(201).send(createdCategory);
  } catch (error) {}
});

router.put("/edit/:id", async (req, res) => {
  try {
    const { title } = req.body;
    const editedCategory = await CategoryScheme.findByIdAndUpdate(
      req.params.id,
      { title }
    );
    return res.status(201).send(editedCategory);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedCategory = await CategoryScheme.findByIdAndDelete(
      req.params.id
    );

    return res.status(201).send(deletedCategory);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
