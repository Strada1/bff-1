import { Router } from 'express';
import * as commentsController from '../controllers/comments.controller';

const router = Router();

router
  .route('/')
  .get(commentsController.getComments)
  .post(commentsController.createComment);

router
  .route('/:commentId')
  .get(commentsController.getComment)
  .put(commentsController.updateComment)
  .delete(commentsController.deleteComment);

export { router as commentsRoute };
