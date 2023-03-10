const messagesService = require('../service/db/messagesService');

const getMessages = async (req, res) => {
  try {
    const messages = await messagesService.getMessages(req.params['chatId']);
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).send(error);
  }
};
const addMessage = async (req, res) => {
  try {
    await messagesService.addMessage(req.params['chatId'], req.body);
    return res.status(201).send('message added');
  } catch (error) {
    return res.status(500).send(error);
  }
};
const updateMessage = async (req, res) => {
  try {
    await messagesService.updateMessage(req.params['messageId'], req.body);
    return res.status(201).send('message updated');
  } catch (error) {
    return res.status(500).send(error);
  }
};
const deleteMessage = async (req, res) => {
  try {
    await messagesService.deleteMessage(req.params['messageId']);
    return res.status(200).send('message deleted');
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getMessages,
  addMessage,
  updateMessage,
  deleteMessage,
};
