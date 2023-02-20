import { Router } from 'express';
import { body, param, query } from 'express-validator';
import * as commentsController from '../controllers/comments.controller';
import { validate } from '../middlewares/validate';
import { commentValidation } from '../models/comments.model';
import { authentication } from '../middlewares/authenticate';

const router = Router();

router
  .route('/')
  .all(validate([...commentValidation]))
  .get(
    validate([query('movieId').optional().isMongoId()]),
    commentsController.getComments
  )
  .post(
    validate([body('movieId').isMongoId(), body('text').exists()]),
    authentication(),
    commentsController.createComment
  );

router
  .route('/:commentId')
  .all(validate([param('commentId').isMongoId(), ...commentValidation]))
  .get(commentsController.getComment)
  .put(authentication(), commentsController.updateComment)
  .delete(authentication(), commentsController.deleteComment);

export { router as commentsRoute };
