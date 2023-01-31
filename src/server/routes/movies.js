const MovieModel = require('../models/movie')
const express = require("express")
const app = express()

const createMovie = app.post("/movies", async (req, res) => {
  try {
    await MovieModel.create(req.body);
    if (!req.body) return res.status(400).send('Movie not created!');
    return res.status(201).send('Movie created');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

module.exports = { createMovie };