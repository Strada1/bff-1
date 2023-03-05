import { IUser } from '../models/users.model';
import { getChatListResponseDTO } from './chats.dto';

export function getFullUserResponseDTO({
  _id,
  email,
  username,
  token,
  roles,
  chats,
  createdAt,
  updatedAt,
}: Partial<IUser>) {
  return {
    _id,
    email,
    username,
    token,
    roles,
    chats: getChatListResponseDTO(chats ?? []),
    createdAt,
    updatedAt,
  };
}

export function getUserResponseDTO({
  _id,
  username,
  roles,
  chats,
  createdAt,
  updatedAt,
}: Partial<IUser>) {
  return {
    _id,
    username,
    roles,
    chats,
    createdAt,
    updatedAt,
  };
}

export function getUsersResponseDTO(users: Partial<IUser>[]) {
  return users.map(getUserResponseDTO);
}
