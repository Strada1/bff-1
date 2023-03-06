const express = require('express');
const { getMessages, getMessage, createMessage, deleteMessage, updateMessage } = require("../services/message");
const { checkAuth } = require("../api/auth");
const router = express.Router();

router.get('/chat/:id/messages', checkAuth(), async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const messages = await getMessages(user, id);
    if (messages) {
      return res.status(200).send(messages);
    }
    return res.status(403).send('You can\'t get messages from this chat');
  } catch (e) {
    console.log(e);
    return res.status(500).send('Unable to receive messages');
  }
});

router.get('/messages/:id', checkAuth(), async (req, res) => {
  try {
    const { id } = req.params;
    const message = await getMessage(id);
    return res.status(200).send(message);
  } catch (e) {
    console.log(e);
    return res.status(500).send('Unable to receive message');
  }
});

router.post('/messages', checkAuth(), async (req, res) => {
  try {
    const message = await createMessage(req.body);
    if (message) {
      return res.status(201).send(message);
    }
    return res.status(403).send('You can\'t post messages from this chat');
  } catch (e) {
    console.log(e);
    return res.status(500).send('Unable to create message');
  }
});

router.delete('/messages/:id', checkAuth(), async (req, res) => {
  try {
    const { id } = req.params;
    const message = await deleteMessage(req.user, id);
    if (message) {
      return res.status(200).send(message);
    }
    return res.status(403).send('You can\'t delete this message');
  } catch (e) {
    console.log(e);
    return res.status(500).send('Unable to delete messages');
  }
});

router.patch('/messages/:id', checkAuth(), async (req, res) => {
  try {
    const { id } = req.params;
    const message = await updateMessage(req.user, id, req.body);
    if (message) {
      return res.status(200).send(message);
    }
    return res.status(403).send('You can\'t update this message');
  } catch (e) {
    console.log(e);
    return res.status(500).send('Unable to update message');
  }
});

module.exports = router;