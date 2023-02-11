const express = require("express")
const { addComment, getAllComments, removeComment, updateComment, getAllCommentsInMovie } = require("../services/commentService");
const { validationResult, body, param } = require("express-validator");
const { validate } = require("../middlewares");
const app = express()

const fieldValidator = body('title').matches(/[a-zA-Zа-яА-Я]/).trim().optional().withMessage('title must contain only letters');

const paramValidator = param('movieIdId').isMongoId().withMessage('movieIdId must be MongoId');

const paramsValidators = [
  param('movieIdId').isMongoId().withMessage('movieIdId must be MongoId'),
  param('commentId').isMongoId().withMessage('commentId must be MongoId'),
]

const createComment = app.post('/movies/:movieId/comments', validate(['title']), paramValidator, fieldValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    await addComment(req.params.movieId, req.body)
    return res.status(200).json('Comment added.');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const showAllComments = app.get('/movies/comments',  async (req, res) => {
  try {
    const allComments = await getAllComments();
    return res.status(200).json(allComments);
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const showComments = app.get('/movies/:movieId/comments', paramValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const allComments = await getAllCommentsInMovie(req.params.movieId);
    return res.status(200).json(allComments);
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const deleteComment = app.delete('/movies/:movieId/comments/:commentId', ...paramsValidators, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    await removeComment(req.params.movieId, req.params.commentId)
    return res.status(201).send('Comment deleted.');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const changeComment = app.put('/movies/:movieId/comments/:commentId', validate(['title']), fieldValidator, ...paramsValidators, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    await updateComment(req.params.movieId, req.params.commentId, req.body)
    return res.status(201).send('Comment change.');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

module.exports = { createComment, showComments, deleteComment, changeComment, showAllComments };