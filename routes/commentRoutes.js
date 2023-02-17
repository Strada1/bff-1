const express = require('express');
const router = express.Router();
const { findAllCommentsForMovie, createComment, findAndDelete, findAndUpdate, findItemById } = require('../services/commentService');
const { validate } = require('../middlewares');
const { commentGetValidatorSchema, commentGetOneValidatorSchema, commentPostValidatorSchema, commentEditValidatorSchema } = require('../validatorSchema/comment');

router.get('/:movieId/comments',
  commentGetValidatorSchema,
  validate,
  async (req, res) => {
    const id = req.params.movieId;
    try {
      const comments = await findAllCommentsForMovie(id).populate('movieId');
      return res.status(201).send(comments);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

router.get('/:movieId/comments/:commentId',
  commentGetOneValidatorSchema,
  validate,
  async (req, res) => {
    const commentId = req.params.commentId;
    try {
      const comment = await findItemById(commentId).populate('movieId');
      return res.status(201).send(comment);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

router.post('/:movieId/comments',
  commentPostValidatorSchema,
  validate,
  async (req, res) => {
    const id = req.params.movieId;
    try {

      const comment = await createComment(id,
        {
          comment: req.body.comment
        });
      return res.status(201).send(`comment: "${comment}" added`);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

router.delete('/:movieId/comments/:commentId',
  commentGetOneValidatorSchema,
  validate,
  async (req, res) => {
    const id = req.params.commentId;
    try {
      const comment = await findAndDelete(id);
      return res.status(201).send('comment deleted');
    } catch (err) {
      return res.status(500).send(err);
    }
  });

router.put('/:movieId/comments/:commentId/edit',
  commentEditValidatorSchema,
  validate,
  async (req, res) => {
    const commentId = req.params.commentId;
    try {
      const category = await findAndUpdate(commentId,
        {
          comment: req.body.comment,
        },
        { new: true });
      return res.status(201).send(category);
    } catch (err) {
      return res.status(500).send(err);
    }
  });


module.exports = router;