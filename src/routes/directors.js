const express = require("express");
const { body, validationResult } = require("express-validator");
const { findByIdAndDelete } = require("../models/directors");
const router = express.Router();
const DirectorScheme = require("../models/directors");

const validator = async (value) => {
  const matchedFilm = await DirectorScheme.findOne({ name: value });
  if (matchedFilm) {
    throw new Error("This author is already exist!");
  }
  return true;
};

router.get("/", async (req, res) => {
  try {
    const directorsList = await DirectorScheme.find();
    return res.status(200).send(directorsList);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post(
  "/add",
  body("name").isString().custom(validator),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name } = req.body;
      const createdDirector = await DirectorScheme.create({ name });
      return res.status(201).send(createdDirector);
    } catch (error) {}
  }
);

router.put(
  "/edit/:id",
  body("name").isString().custom(validator),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name } = req.body;
      const editedDirector = await DirectorScheme.findByIdAndUpdate(
        req.params.id,
        { name }
      );
      return res.status(201).send(editedDirector);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedDirector = await DirectorScheme.findByIdAndDelete(
      req.params.id
    );

    return res.status(201).send(deletedDirector);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
