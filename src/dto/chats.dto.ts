import { IChat } from '../models/chats.model';

export function getChatResponseDTO({ _id, title, users }: Partial<IChat>) {
  return {
    _id,
    title,
    users,
  };
}

export function getChatListResponseDTO(chats: Partial<IChat>[]) {
  return chats.map(getChatResponseDTO);
}

export function getChatFullResponseDTO({
  _id,
  title,
  users,
  createdAt,
  updatedAt,
}: Partial<IChat>) {
  return {
    _id,
    title,
    users,
    createdAt,
    updatedAt,
  };
}

export function getChatsFullResponseDTO(chats: Partial<IChat>[]) {
  return chats.map(getChatFullResponseDTO);
}
