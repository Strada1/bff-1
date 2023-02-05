const express = require("express")
const { addComment, getAllComments, removeComment, updateComment } = require("../services/commentService");
const app = express()

const createComment = app.post('/movies/:movieId/comments', async (req, res) => {
  try {
    if (!req.body && req?.params?.movieId) return res.status(400).send('Comment not created!');
    const id = req.params.movieId;
    await addComment(id, req.body)
    return res.status(200).json('Comment added.');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const showComments = app.get('/movies/:movieId/comments', async (req, res) => {
  try {
    if (!req.body && !req.params.movieId) return res.status(400).send('Comment not show!');
    const id = req.params.movieId;
    const allComments = await getAllComments(id);
    return res.status(200).json(allComments);
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const deleteComment = app.delete('/movies/:movieId/comments/:commentId', async (req, res) => {
  try {
    const isNotParams = !req.body && !req.params.movieId && !req.params.commentId
    if (isNotParams) return res.status(400).send('Comment not deleted!');
    const commentId = req.params.commentId;
    const movieId = req.params.movieId;
    await removeComment(movieId, commentId)
    return res.status(201).send('Comment deleted.');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const changeComment = app.put('/movies/:movieId/comments/:commentId', async (req, res) => {
  try {
    const isNotParams = !req.body && !req.params.movieId && !req.params.commentId
    if (isNotParams) return res.status(400).send('Comment not deleted!');
    const commentId = req.params.commentId;
    const movieId = req.params.movieId;
    await updateComment(movieId, commentId, req.body)
    return res.status(201).send('Comment change.');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

module.exports = { createComment, showComments, deleteComment, changeComment };