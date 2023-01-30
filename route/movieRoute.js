const MovieModel = require("../models/movie");
const express = require("express");
const app = express();

const getAllMovies = app.get("/movies", async (req, res) => {
  try {
    const movies = await MovieModel.find();

    return res.status(201).send(movies);
  } catch (e) {
    return res.status(500).send("error " + e);
  }
});

const createMovie = app.post("/movies", async (req, res) => {
  try {
    await MovieModel.create({
      title: req.body.title,
      year: req.body.year,
      rating: req.body.rating,
      category: req.body.category,
      duration: req.body.duration,
      director: req.body.director,
    });

    return res.status(201).send("movie created");
  } catch (e) {
    return res.status(500).send("error " + e);
  }
});

module.exports = { createMovie, getAllMovies };
