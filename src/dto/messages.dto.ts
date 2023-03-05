import { IMessage } from '../models/messages.model';

export function getMessageResponseDTO({
  _id,
  user,
  text,
  chatId,
  createdAt,
  updatedAt,
}: Partial<IMessage>) {
  return {
    _id,
    user,
    text,
    chatId,
    createdAt,
    updatedAt,
  };
}
