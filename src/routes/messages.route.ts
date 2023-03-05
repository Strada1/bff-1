import { Router } from 'express';
import { authorization } from '../middlewares/authorization';
import * as messagesController from '../controllers/messages.controller';
import { validate } from '../middlewares/validate';
import { messageValidation } from '../models/messages.model';
import { ROLES } from '../shared/const';
import { authentication } from '../middlewares/authenticate';

const router = Router();

router
  .route('/')
  .all(
    authentication(),
    authorization([ROLES.ADMIN]),
    validate([...messageValidation])
  )
  .get(messagesController.getMessages);

router
  .route('/:messageId')
  .all(
    authentication(),
    authorization([ROLES.ADMIN]),
    validate([...messageValidation])
  )
  .get(messagesController.getMessage)
  .delete(messagesController.deleteMessage);

export { router as messagesRoute };
