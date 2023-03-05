import { Router } from 'express';
import { authorization } from '../middlewares/authorization';
import * as chatsController from '../controllers/chats.controller';
import { validate } from '../middlewares/validate';
import { chatValidation } from '../models/chats.model';
import { ROLES } from '../shared/const';
import { authentication } from '../middlewares/authenticate';

const router = Router();

router
  .route('/')
  .all(validate([...chatValidation]))
  .get(chatsController.getChats)
  .post(
    authentication(),
    authorization([ROLES.ADMIN]),
    chatsController.createChat
  );

router
  .route('/:chatId')
  .all(validate([...chatValidation]))
  .get(chatsController.getChat)
  .put(
    authentication(),
    authorization([ROLES.ADMIN]),
    chatsController.updateChat
  )
  .delete(
    authentication(),
    authorization([ROLES.ADMIN]),
    chatsController.deleteChat
  );

router
  .route('/:chatId/messages')
  .all(authentication(), validate([...chatValidation]))
  .get(chatsController.getChatMessagesById);

export { router as chatsRoute };
