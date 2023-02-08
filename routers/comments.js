const {Router} = require('express');
const {PATHS} = require('../constants');
const validateBodyAndParamsFields = require('../middlewares/validate');
const {
  getAllcomments,
  getCommentById,
  addComment,
  updateComment,
  deleteComment,
} = require('../service/db/commentsService');

const router = Router();

router.get(PATHS.COMMENTS.ALL, validateBodyAndParamsFields([], ['movieId']), async (req, res) => {
  try {
    const allComments = await getAllcomments(req.params['movieId']);
    res.status(201).json(allComments);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get(PATHS.COMMENTS.BY_ID, validateBodyAndParamsFields([], ['commentId']), async (req, res) => {
  try {
    const comment = await getCommentById(req.params['commentId']);
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post(PATHS.COMMENTS.ALL, validateBodyAndParamsFields(['text'], ['movieId']), async (req, res) => {
  try {
    await addComment(req.params['movieId'], req.body);
    res.status(201).send('comment added');
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put(PATHS.COMMENTS.BY_ID, validateBodyAndParamsFields(['text'], ['movieId', 'commentId']), async (req, res) => {
  try {
    await updateComment(req.params['commentId'], req.body);
    res.status(201).send('comment updated');
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete(PATHS.COMMENTS.BY_ID, validateBodyAndParamsFields([], ['movieId', 'commentId']), async (req, res) => {
  try {
    await deleteComment(req.params['commentId']);
    res.status(201).send('comment deleted');
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
