const express = require("express");
const { findByIdAndDelete } = require("../models/directors");
const router = express.Router();
const DirectorScheme = require("../models/directors");

router.get("/", async (req, res) => {
  try {
    const directorsList = await DirectorScheme.find();
    return res.status(200).send(directorsList);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/add", async (req, res) => {
  try {
    const { name } = req.body;
    const createdDirector = await DirectorScheme.create({ name });
    return res.status(201).send(createdDirector);
  } catch (error) {}
});

router.put("/edit/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const editedDirector = await DirectorScheme.findByIdAndUpdate(
      req.params.id,
      { name }
    );
    return res.status(201).send(editedDirector);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedDirector = await DirectorScheme.findByIdAndDelete(req.params.id);

    return res.status(201).send(deletedDirector);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
