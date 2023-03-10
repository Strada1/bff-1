const usersService = require('../service/db/usersService');

const getUser = async (req, res) => {
  try {
    const user = await usersService.getUser(req.params['userId']);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};
const getUserChats = async (req, res) => {
  try {
    const chats = await usersService.getUserChats(req.params['userId']);
    return res.status(200).json(chats);
  } catch (error) {
    return res.status(500).send(error);
  }
};
const addChat = async (req, res) => {
  try {
    const user = await usersService.addChat(req.params['userId'], req.body.chatId);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};
const deleteChat = async (req, res) => {
  try {
    const user = await usersService.deleteChat(req.params['userId'], req.body.chatId);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getUser,
  getUserChats,
  addChat,
  deleteChat,
};
