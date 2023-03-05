import { Types } from 'mongoose';
import { Chat, IChat } from '../models/chats.model';
import { CacheService } from './cache.service';

const cachedChatsById = new CacheService({ stdTTL: 10, checkperiod: 10 });

export async function getChatById(
  id: string | Types.ObjectId
): Promise<IChat | null> {
  if (cachedChatsById.has(id.toString())) {
    return cachedChatsById.get(id.toString())!;
  }

  const chat = await Chat.findById(id).lean();
  cachedChatsById.set(id.toString(), chat);

  return chat;
}

export function getChat(id: string | Types.ObjectId) {
  return Chat.findById(id);
}

export function getChatByTitle(title: string) {
  return Chat.findOne({ title });
}

export function getChats() {
  return Chat.find({});
}

export async function createChat(chat: IChat) {
  return Chat.create(chat);
}

export async function updateChat(
  id: string | Types.ObjectId,
  payload: Partial<IChat>
) {
  cachedChatsById.delete(id.toString());
  return Chat.findByIdAndUpdate(id, payload, { new: true }).lean();
}

export function deleteChat(id: string | Types.ObjectId) {
  cachedChatsById.delete(id.toString());
  return Chat.findByIdAndDelete(id);
}

export async function addUserToChat(
  chatId: string | Types.ObjectId,
  userId: string | Types.ObjectId
) {
  cachedChatsById.delete(chatId.toString());
  return Chat.findByIdAndUpdate(
    { _id: chatId },
    { $addToSet: { users: userId } },
    { new: true }
  );
}

export async function removeUserFromChat(
  chatId: string | Types.ObjectId,
  userId: string | Types.ObjectId
) {
  cachedChatsById.delete(chatId.toString());
  return Chat.findByIdAndUpdate(
    { _id: chatId },
    { $pull: { users: userId } },
    { new: true }
  );
}
