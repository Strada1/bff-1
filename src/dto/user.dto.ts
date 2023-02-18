import { IUser } from '../models/users.model';

export function getFullUserResponseDTO({
  _id,
  email,
  username,
  token,
  roles,
  favorites,
  createdAt,
  updatedAt,
}: Partial<IUser>) {
  return {
    _id,
    email,
    username,
    token,
    roles,
    favorites,
    createdAt,
    updatedAt,
  };
}

export function getUserResponseDTO({
  _id,
  username,
  roles,
  favorites,
  createdAt,
  updatedAt,
}: Partial<IUser>) {
  return {
    _id,
    username,
    roles,
    favorites,
    createdAt,
    updatedAt,
  };
}

export function getUsersResponseDTO(users: Partial<IUser>[]) {
  return users.map(getUserResponseDTO);
}
