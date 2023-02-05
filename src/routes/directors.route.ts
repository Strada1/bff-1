import { Router } from 'express';
import * as directorsController from '../controllers/directors.controller';

const router = Router();

router
  .route('/')
  .get(directorsController.getDirectors)
  .post(directorsController.createDirector);

router
  .route('/:directorId')
  .get(directorsController.getDirector)
  .put(directorsController.updateDirector)
  .delete(directorsController.deleteDirector);

export { router as directorsRoute };
