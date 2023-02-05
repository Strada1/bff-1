const express = require("express")
const { addComment } = require("../services/commentService");
const app = express()

const createComment = app.post('/movies/:movieId/comments', async (req, res) => {
  try {
    if (!req.body && req?.params?.movieId) return res.status(400).send('Comment not created!');
    const id = req.params.movieId;
    const movie = await addComment(id, req.body)
    movie.save();
    return res.status(200).json('Comment added.');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

module.exports = { createComment };