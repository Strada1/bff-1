const Chats = require('../../models/Chats');

const getChats = async () => {
  return await Chats.find({});
};
const createChat = async (chat) => {
  await Chats.create(chat);
};
const updateChat = async (chatId, chat) => {
  await Chats.findByIdAndUpdate(chatId, {...chat});
};
const deleteChat = async (chatId) => {
  await Chats.findByIdAndDelete(chatId);
};

module.exports = {
  getChats,
  createChat,
  updateChat,
  deleteChat,
};
