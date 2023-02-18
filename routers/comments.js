const {Router} = require('express');
const {body, param} = require('express-validator');
const {PATHS} = require('../constants');
const {
  getCommentsByMovieId,
  getCommentById,
  addComment,
  updateComment,
  deleteComment,
} = require('../controllers/comments');
const validate = require('../middlewares/validate');

const router = Router();

router.get(PATHS.COMMENTS.ALL, [], validate, getCommentsByMovieId);

router.get(
  PATHS.COMMENTS.BY_ID,
  [param('commentId').notEmpty().withMessage('commentId is required param')],
  validate,
  getCommentById
);

router.post(
  PATHS.COMMENTS.ALL,
  [
    body('text').notEmpty().withMessage('the text field should not be empty'),
    param('movieId').notEmpty().withMessage('movieId is required param'),
  ],
  validate,
  addComment
);

router.put(
  PATHS.COMMENTS.BY_ID,
  [
    body('text').notEmpty().withMessage('the text field should not be empty'),
    param('commentId').notEmpty().withMessage('commentId is required param'),
  ],
  validate,
  updateComment
);

router.delete(PATHS.COMMENTS.BY_ID, [], validate, deleteComment);

module.exports = router;
