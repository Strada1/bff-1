import { Router } from 'express';
import { body, param } from 'express-validator';
import * as directorsController from '../controllers/directors.controller';
import { validate } from '../middlewares/validate';
import { OBJECT_ID_LENGTH_RANGE } from '../shared/const';

const router = Router();

router
  .route('/')
  .get(directorsController.getDirectors)
  .post(
    validate([body('firstName').notEmpty(), body('lastName').notEmpty()]),
    directorsController.createDirector
  );

router
  .route('/:directorId')
  .all(validate([param('directorId').isLength(OBJECT_ID_LENGTH_RANGE)]))
  .get(directorsController.getDirector)
  .put(directorsController.updateDirector)
  .delete(directorsController.deleteDirector);

export { router as directorsRoute };
