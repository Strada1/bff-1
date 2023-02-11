import { Router } from 'express';
import { body, param } from 'express-validator';
import * as directorsController from '../controllers/directors.controller';
import { validate } from '../middlewares/validate';
import { directorValidation } from '../models/director.model';

const router = Router();

router
  .route('/')
  .all(validate([...directorValidation]))
  .get(directorsController.getDirectors)
  .post(
    validate([body('firstName').exists(), body('lastName').exists()]),
    directorsController.createDirector
  );

router
  .route('/:directorId')
  .all(validate([param('directorId').isMongoId(), ...directorValidation]))
  .get(directorsController.getDirector)
  .put(directorsController.updateDirector)
  .delete(directorsController.deleteDirector);

export { router as directorsRoute };
