import STATUS from 'http-status';
import asyncHandler from 'express-async-handler';
import * as messagesService from '../services/messages.service';

export const getMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.params;
  const message = await messagesService.getMessage(messageId);

  res.status(STATUS.OK).send(message);
});

export const getMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.query as {
    chatId: string;
  };

  const messages = await messagesService.getMessages({ chatId });

  res.status(STATUS.OK).send(messages);
});

export const deleteMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.params;
  await messagesService.deleteMessage(messageId);

  res.status(STATUS.NO_CONTENT).send();
});
