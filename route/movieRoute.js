const express = require("express");
const app = express();
const {
  allMovies,
  moviesCreate,
  moviesDelete,
  editMovies,
  addedComment,
} = require("../services/movieServices");

const getAllMovies = app.get("/movies", async (req, res) => {
  try {
    const movies = await allMovies();

    return res.status(201).send(movies);
  } catch (e) {
    return res.status(500).send(e);
  }
});

const createMovie = app.post("/movies", async (req, res) => {
  try {
    await moviesCreate(req);

    return res.status(201).send("movie created");
  } catch (e) {
    return res.status(500).send(e);
  }
});

const deleteMovie = app.delete("/movies/:movieId", async (req, res) => {
  try {
    await moviesDelete(req.params.movieId);

    return res.status(200).send("movie deleted");
  } catch (e) {
    return res.status(500).send(e);
  }
});

const editMovie = app.put("/movies/:movieId", async (req, res) => {
  try {
    let updateMovie = await editMovies(req);

    return res.status(200).send(updateMovie);
  } catch (e) {
    return res.status(500).send(e);
  }
});

const addedComent = app.put("/movies/comment/:movieId", async (req, res) => {
  try {
    let updateMovie = await addedComment(req);

    return res.status(200).send(updateMovie);
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = {
  createMovie,
  getAllMovies,
  deleteMovie,
  editMovie,
  addedComent,
};
