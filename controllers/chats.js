const chatsService = require('../service/db/chatsService');

const getChats = async (req, res) => {
  try {
    const chats = await chatsService.getChats();
    return res.status(200).json(chats);
  } catch (error) {
    return res.status(500).send(error);
  }
};
const createChat = async (req, res) => {
  try {
    await chatsService.createChat(req.body);
    return res.status(201).send('chat is created');
  } catch (error) {
    return res.status(500).send(error);
  }
};
const updateChat = async (req, res) => {
  try {
    await chatsService.updateChat(req.params['chatId'], req.body);
    return res.status(200).send('chat is updated');
  } catch (error) {
    return res.status(500).send(error);
  }
};
const deleteChat = async (req, res) => {
  try {
    await chatsService.deleteChat(req.params['chatId']);
    return res.status(200).send('chat is deleted');
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getChats,
  createChat,
  updateChat,
  deleteChat,
};
