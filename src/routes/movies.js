const express = require("express");
const router = express.Router();
const MovieSchema = require("../models/movie");

router.get("/", async (req, res) => {
  try {
    const movieList = await MovieSchema.find();
    return res.status(200).send(movieList);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/add", async (req, res) => {
  try {
    const { title, year, rating } = req.body;

    const createdMovie = await MovieSchema.create({ title, year, rating });
    return res.status(201).send(createdMovie);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const { title, year, rating } = req.body;
    const { id } = req.params;

    const updatedMovie = await MovieSchema.findByIdAndUpdate(id, {
      title,
      year,
      rating,
    });
    return res.status(201).send(updatedMovie);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedMovie = await MovieSchema.findByIdAndDelete(id);
    return res.status(200).send(updatedMovie);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
