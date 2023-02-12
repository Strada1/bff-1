const {validationResult} = require('express-validator');
const commentsService = require('../service/db/commentsService');

const getCommentsByMovieId = async (req, res) => {
  try {
    const allComments = await commentsService.getAllcomments(req.params['movieId']);
    res.status(200).json(allComments);
  } catch (error) {
    return res.status(500).send(error);
  }
};
const getCommentById = async (req, res) => {
  try {
    const comment = await commentsService.getCommentById(req.params['commentId']);
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).send(error);
  }
};
const addComment = async (req, res) => {
  try {
    await commentsService.addComment(req.params['movieId'], req.body);
    res.status(201).send('comment added');
  } catch (error) {
    return res.status(500).send(error);
  }
};
const updateComment = async (req, res) => {
  try {
    await commentsService.updateComment(req.params['commentId'], req.body);
    res.status(201).send('comment updated');
  } catch (error) {
    return res.status(500).send(error);
  }
};
const deleteComment = async (req, res) => {
  try {
    await commentsService.deleteComment(req.params['movieId'], req.params['commentId']);
    res.status(201).send('comment deleted');
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getCommentsByMovieId,
  getCommentById,
  addComment,
  updateComment,
  deleteComment,
};
