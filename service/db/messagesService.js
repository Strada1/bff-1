const Messages = require('../../models/Messages');

const getMessages = async (chatId) => {
  const messages = await Messages.find({
    chatId: chatId,
  });
  return messages;
};

const addMessage = async (chatId, message) => {
  await Messages.create(message);
};
const updateMessage = async (messageId, message) => {
  await Messages.findByIdAndUpdate(messageId, {...message});
};
const deleteMessage = async (messageId) => {
  await Messages.findByIdAndDelete(messageId);
};

module.exports = {
  getMessages,
  addMessage,
  updateMessage,
  deleteMessage,
};
