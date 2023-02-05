const { addedComment, deleteComment } = require("../services/commentServices");
const express = require("express");
const app = express();

const commentCreate = app.post("/movies/comment/:movieId", async (req, res) => {
  try {
    await addedComment(req);

    return res.status(201).send("comment created");
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

const commentDelete = app.delete(
  "/movies/comment/:movieId",
  async (req, res) => {
    try {
      await deleteComment(req);

      return res.status(200).send("comment deleted");
    } catch (e) {
      return res.status(500).send(e.message);
    }
  }
);

module.exports = { commentCreate, commentDelete };
