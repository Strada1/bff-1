import { Router } from 'express';
import { body, param, query } from 'express-validator';
import * as commentsController from '../controllers/comments.controller';
import { validate } from '../middlewares/validate';
import { OBJECT_ID_LENGTH_RANGE } from '../shared/const';

const router = Router();

router
  .route('/')
  .get(
    validate([query('movieId').optional().isLength(OBJECT_ID_LENGTH_RANGE)]),
    commentsController.getComments
  )
  .post(
    validate([
      body('movieId').isLength(OBJECT_ID_LENGTH_RANGE),
      body('text').notEmpty(),
    ]),
    commentsController.createComment
  );

router
  .route('/:commentId')
  .all(validate([param('commentId').isLength(OBJECT_ID_LENGTH_RANGE)]))
  .get(commentsController.getComment)
  .put(commentsController.updateComment)
  .delete(commentsController.deleteComment);

export { router as commentsRoute };
