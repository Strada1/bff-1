const express = require("express");
const router = express.Router();
const MovieSchema = require("../models/movie");
const CommentScheme = require("../models/comments");

router.get("/", async (req, res) => {
  try {
    const movieList = await MovieSchema.find().populate("category comments");
    return res.status(200).send(movieList);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("/add", async (req, res) => {
  try {
    const { title, year, rating, category } = req.body;

    const createdMovie = await MovieSchema.create({
      title,
      year,
      rating,
      category,
    });
    return res.status(201).send(createdMovie);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put("/edit/:id", async (req, res) => {
  try {
    const { title, year, rating, category } = req.body;
    const { id } = req.params;

    const updatedMovie = await MovieSchema.findByIdAndUpdate(id, {
      title,
      year,
      rating,
      category,
    });
    return res.status(201).send(updatedMovie);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put("/add_comments/:id/", async (req, res) => {
  try {
    const { name, like, dislike, text } = req.body;
    const { id } = req.params;

    const updatedMovie = await CommentScheme.create({
      name,
      like,
      dislike,
      text,
    });

    const currentMovie = await MovieSchema.findByIdAndUpdate(id, {
      $push: { comments: updatedMovie._id },
    });

    return res.status(201).send(currentMovie);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/delete_comments/:id/comments/:commentId", async (req, res) => {
  try {
    const { id, commentId } = req.params;

    const currentMovie = await MovieSchema.findByIdAndUpdate(id, {
      $pull: { comments: commentId },
    });

    return res.status(201).send(currentMovie);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put("/edit_comments/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text, name, like, dislike } = req.body;

    const currentComment = await CommentScheme.findByIdAndUpdate(commentId, {
      text,
      name,
      like,
      dislike,
    });

    return res.status(201).send(currentComment);
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
