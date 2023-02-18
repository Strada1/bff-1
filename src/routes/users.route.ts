import { Router } from 'express';
import { body, param } from 'express-validator';
import { authorization } from '../middlewares/authorization';
import * as usersController from '../controllers/users.controller';
import { validate } from '../middlewares/validate';
import { userValidation } from '../models/users.model';
import { ROLES } from '../shared/const';
import { authentication } from '../middlewares/authenticate';
import { rateLimiter } from '../middlewares/rateLimiter';
import { config } from '../config';

const router = Router();

router
  .route('/')
  .all(validate([...userValidation]))
  .get(usersController.getUsers)
  .post(
    validate([body('email').exists(), body('username').exists()]),
    rateLimiter(config.rateLimits.registration),
    usersController.createUser
  );

router
  .route('/auth')
  .all(validate([...userValidation]))
  .post(
    validate([body('email').exists(), body('password').exists()]),
    rateLimiter(config.rateLimits.authentication),
    usersController.authUser
  );

router
  .route('/me')
  .all(authentication(), validate([...userValidation]))
  .get(usersController.getUserInfo)
  .put(usersController.updateUserInfo);

router
  .route('/:userId')
  .all(param('userId').isMongoId(), validate([...userValidation]))
  .get(usersController.getUser)
  .put(
    authentication(),
    authorization([ROLES.ADMIN]),
    usersController.updateUser
  )
  .delete(
    authentication(),
    authorization([ROLES.ADMIN]),
    usersController.deleteUser
  );

router
  .route('/:userId/roles')
  .all(param('userId').isMongoId(), validate([...userValidation]))
  .get(usersController.getUserRoles)
  .post(
    authentication(),
    authorization([ROLES.ADMIN]),
    usersController.addRoleToUser
  )
  .delete(
    authentication(),
    authorization([ROLES.ADMIN]),
    usersController.removeRoleFromUser
  );

export { router as usersRoute };
