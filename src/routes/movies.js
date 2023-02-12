const express = require("express");
const router = express.Router();
const MovieSchema = require("../models/movie");
const {
  editComments,
  deleteComments,
  addComments,
} = require("../services/comments");
const { createMovie, editMovie, deleteMovie } = require("../services/movie");

router.get("/", async (req, res) => {
  try {
    const movieList = await MovieSchema.find().populate("category comments director");
    return res.status(200).send(movieList);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/add", async (req, res) => {
  try {
    const addedMovie = await createMovie(req.body);

    return res.status(201).send(addedMovie);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const updatedMovie = await editMovie(req);
    return res.status(201).send(updatedMovie);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put("/add_comments/:id/", async (req, res) => {
  try {
    const currentMovie = await addComments(req);
    return res.status(201).send(currentMovie);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/delete_comments/:id/comments/:commentId", async (req, res) => {
  try {
    const currentMovie = await deleteComments(req.params);
    return res.status(201).send(currentMovie);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put("/edit_comments/:commentId", async (req, res) => {
  try {
    const currentComment = await editComments(req);
    return res.status(201).send(currentComment);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const updatedMovie = await deleteMovie(req.params);
    return res.status(200).send(updatedMovie);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
