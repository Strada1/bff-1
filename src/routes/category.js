const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const CategoryScheme = require("../models/category");

const validator = async (value) => {
  const matchedCategory = await CategoryScheme.findOne({ title: value });
  if (matchedCategory) {
    throw new Error("This category is already exist!");
  }
  return true;
};

router.get("/", async (req, res) => {
  try {
    const categoryList = await CategoryScheme.find();
    return res.status(200).send(categoryList);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post(
  "/add",
  body("title").isString().custom(validator),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title } = req.body;
      const createdCategory = await CategoryScheme.create({ title });
      return res.status(201).send(createdCategory);
    } catch (error) {}
  }
);

router.put(
  "/edit/:id",
  body("title").isString().custom(validator),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title } = req.body;
      const editedCategory = await CategoryScheme.findByIdAndUpdate(
        req.params.id,
        { title }
      );
      return res.status(201).send(editedCategory);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

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
