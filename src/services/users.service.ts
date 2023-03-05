import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import { IUser, User } from '../models/users.model';
import { ROLES } from '../shared/const';
import * as passwordService from './password.service';
import * as tokenService from './token.service';

export function getUsers() {
  return User.find();
}
export async function getUsersIdsByChat(
  id: string | Types.ObjectId
): Promise<string[]> {
  const users = await User.find(
    { chats: { $in: [new ObjectId(id)] } },
    { _ids: 1 }
  );

  return users.map((user) => user._id.toString());
}

export function getUser(id: string | Types.ObjectId) {
  return User.findById(id);
}

export function getUserByEmail(email: string) {
  return User.findOne({ email }).lean();
}

export function getUserByToken(token: string) {
  return User.findOne({ token }).populate('chats').lean();
}

export function checkRole(user: IUser, role: string) {
  const roles = user?.roles;
  return roles?.includes(role);
}

export async function createUser(user: IUser) {
  const hashPassword = await passwordService.encryptPassword(user.password);
  const token = tokenService.createToken({ _id: user._id });
  const defaultRoles = [ROLES.USER];

  return User.create({
    ...user,
    roles: user.roles ?? defaultRoles,
    password: hashPassword,
    token,
  });
}

export async function addRoleToUser(id: string | Types.ObjectId, role: string) {
  return User.findByIdAndUpdate(
    { _id: id },
    { $addToSet: { roles: role } },
    { new: true }
  );
}

export async function removeRoleFromUser(
  id: string | Types.ObjectId,
  role: string
) {
  return User.findByIdAndUpdate(
    { _id: id },
    { $pull: { roles: role } },
    { new: true }
  );
}

export async function addChatToUser(
  id: string | Types.ObjectId,
  chatId: string | Types.ObjectId
) {
  return User.findByIdAndUpdate(
    { _id: id },
    { $addToSet: { chats: chatId } },
    { new: true }
  );
}

export async function removeChatFromUser(
  id: string | Types.ObjectId,
  chatId: string | Types.ObjectId
) {
  return User.findByIdAndUpdate(
    { _id: id },
    { $pull: { chats: chatId } },
    { new: true }
  );
}

export async function updateUser(
  id: string | Types.ObjectId,
  { username, password }: Partial<IUser>
) {
  const newData: Partial<IUser> = { username };

  if (password) {
    newData.password = await passwordService.encryptPassword(password);
  }

  return User.findByIdAndUpdate(id, newData, { new: true }).lean();
}

export function deleteUser(id: string | Types.ObjectId) {
  return User.findByIdAndDelete(id);
}

export function deleteChatFromUsers(chatId: string | Types.ObjectId) {
  return User.updateMany({}, { $pull: { chats: chatId } });
}

export async function authUser(
  email: IUser['email'],
  password: IUser['password']
) {
  const user = await getUserByEmail(email);

  if (!user) {
    return {};
  }

  const isPasswordCorrect = await passwordService.comparePassword(
    password,
    user.password
  );

  return {
    user,
    isPasswordCorrect,
  };
}
