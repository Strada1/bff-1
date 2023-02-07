const express = require('express');
const router = express.Router();
const {
  getComments,
  createComment,
  updateComment,
  deliteComment,
} = require('../services/commentService.js');
const { body } = require('express-validator');
const validateParams = require('../middlewares/validate.js');

router.get('/', async (req, res) => {
  try {
    const comments = await getComments();
    return res.status(200).send(comments);
  } catch (e) {
    return res.status(500).send(`Internal server error: ${e.message}`);
  }
});

router.post(
  '/',
  validateParams([body(['userName', 'text', 'movieId']).notEmpty()]),
  async (req, res) => {
    try {
      await createComment(req.body);
      return res.status(201).send('Comment adding');
    } catch (e) {
      return res.status(500).send(`Internal server error: ${e.message}`);
    }
  }
);

router.put(
  '/:commentId',
  validateParams([body('text').notEmpty()]),
  async (req, res) => {
    try {
      const result = await updateComment(req.body.id, req.body);
      if (!result) {
        return res.status(404).send('ID is not found');
      }
      return res.status(200).send('Comment updated');
    } catch (e) {
      return res.status(500).send(`Internal server error: ${e.message}`);
    }
  }
);

router.delete(
  '/:commentId',
  validateParams([body('id').notEmpty()]),
  async (req, res) => {
    try {
      const result = await deliteComment(req.body.id);
      if (!result) {
        return res.status(404).send('ID is not found');
      }
      return res.status(201).send('Comment delited');
    } catch (e) {
      return res.status(500).send(`Internal server error: ${e.message}`);
    }
  }
);

module.exports = router;
