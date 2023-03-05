import { Types } from 'mongoose';
import { IMessage, Message } from '../models/messages.model';

export function getMessage(messageId: string | Types.ObjectId) {
  return Message.findById(messageId);
}

export function getMessages(options?: { chatId?: string }) {
  const query = Message.find();

  if (options?.chatId) {
    query.where('chatId', options.chatId);
  }

  return query;
}

export function createMessage(
  chatId: IMessage['chatId'],
  user: IMessage['user'] | string,
  text: IMessage['text']
) {
  return Message.create({ chatId, user, text });
}

export function deleteMessagesByChat(chatId: string | Types.ObjectId) {
  return Message.deleteMany({ chatId });
}

export function deleteMessage(messageId: string | Types.ObjectId) {
  return Message.findByIdAndDelete(messageId);
}
