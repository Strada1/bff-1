import { Router } from 'express';
import { body, param } from 'express-validator';
import { authorization } from '../middlewares/authorization';
import * as directorsController from '../controllers/directors.controller';
import { validate } from '../middlewares/validate';
import { directorValidation } from '../models/director.model';
import { ROLES } from '../shared/const';
import { authentication } from '../middlewares/authenticate';

const router = Router();

router
  .route('/')
  .all(validate([...directorValidation]))
  .get(directorsController.getDirectors)
  .post(
    authentication(),
    authorization([ROLES.ADMIN]),
    validate([body('firstName').exists(), body('lastName').exists()]),
    directorsController.createDirector
  );

router
  .route('/:directorId')
  .all(validate([param('directorId').isMongoId(), ...directorValidation]))
  .get(directorsController.getDirector)
  .put(
    authentication(),
    authorization([ROLES.ADMIN]),
    directorsController.updateDirector
  )
  .delete(
    authentication(),
    authorization([ROLES.ADMIN]),
    directorsController.deleteDirector
  );

export { router as directorsRoute };
