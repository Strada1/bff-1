import STATUS from 'http-status';
import asyncHandler from 'express-async-handler';
import ApiError from '../shared/ApiError';
import * as chatsService from '../services/chats.service';
import * as usersService from '../services/users.service';
import * as messagesService from '../services/messages.service';
import { ERROR_TEXT } from '../shared/const';
import {
  getChatFullResponseDTO,
  getChatsFullResponseDTO,
} from '../dto/chats.dto';
import { IUser } from '../models/users.model';

export const getChat = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const chat = await chatsService.getChat(chatId);

  if (!chat) {
    throw new ApiError(STATUS.NOT_FOUND, ERROR_TEXT.CHATS.CHAT_NOT_FOUND);
  }

  res.status(STATUS.OK).send(getChatFullResponseDTO(chat));
});

export const getChats = asyncHandler(async (req, res) => {
  const chats = await chatsService.getChats();

  res.status(STATUS.OK).send(getChatsFullResponseDTO(chats));
});

export const getChatMessagesById = asyncHandler(async (req, res) => {
  const { chats } = req.user as IUser;
  const { chatId } = req.params as {
    chatId: string;
  };
  const userChats = chats?.map((chat) => chat._id.toString());
  const isUserHaveAccessToChat = userChats?.includes(chatId);

  if (!isUserHaveAccessToChat) {
    throw new ApiError(STATUS.UNAUTHORIZED, ERROR_TEXT.AUTH.NOT_ENOUGH_RIGHTS);
  }

  const messages = await messagesService.getMessages({ chatId });

  res.status(STATUS.OK).send(messages);
});

export const createChat = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const chat = await chatsService.getChatByTitle(title);

  if (chat) {
    throw new ApiError(STATUS.CONFLICT, ERROR_TEXT.CHATS.CHAT_EXIST);
  }

  const createdChat = await chatsService.createChat({ title });

  res.status(STATUS.CREATED).send(getChatFullResponseDTO(createdChat));
});

export const updateChat = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { title } = req.body;
  const updatedChat = await chatsService.updateChat(chatId, { title });

  if (!updatedChat) {
    throw new ApiError(STATUS.NOT_FOUND, ERROR_TEXT.CHATS.CHAT_NOT_FOUND);
  }

  res.status(STATUS.OK).send(getChatFullResponseDTO(updatedChat));
});

export const deleteChat = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const deletedChat = await chatsService.deleteChat(chatId);

  if (!deletedChat) {
    throw new ApiError(STATUS.NOT_FOUND, ERROR_TEXT.CHATS.CHAT_NOT_FOUND);
  }

  await usersService.deleteChatFromUsers(chatId);
  await messagesService.deleteMessagesByChat(chatId);

  res.status(STATUS.NO_CONTENT).send();
});
