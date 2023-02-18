import { Router } from 'express';
import { body, param } from 'express-validator';
import { authorization } from '../middlewares/authorization';
import * as categoriesController from '../controllers/categories.controller';
import { validate } from '../middlewares/validate';
import { categoryValidation } from '../models/categories.model';
import { sortOrderValidation } from '../shared/validations';
import { ROLES } from '../shared/const';
import { authentication } from '../middlewares/authenticate';

const router = Router();

router
  .route('/')
  .all(validate([...categoryValidation]))
  .get(validate([...sortOrderValidation]), categoriesController.getCategories)
  .post(
    authentication(),
    authorization([ROLES.ADMIN]),
    validate([body('title').exists()]),
    categoriesController.createCategory
  );

router
  .route('/:categoryId')
  .all(validate([param('categoryId').isMongoId(), ...categoryValidation]))
  .get(categoriesController.getCategory)
  .put(
    authentication(),
    authorization([ROLES.ADMIN]),
    categoriesController.updateCategory
  )
  .delete(
    authentication(),
    authorization([ROLES.ADMIN]),
    categoriesController.deleteCategory
  );

export { router as categoriesRoute };
