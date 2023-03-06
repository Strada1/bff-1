const express = require('express');
const { getChats, getChat, createChat, deleteChat, updateChat } = require("../services/chat");
const { checkRole, checkAuth } = require("../api/auth");
const { userRoles } = require("../services/user");
const router = express.Router();

router.get('/chats',  checkAuth([userRoles.admin]), async (req, res) => {
  try {
    const chats = await getChats();
    return res.status(200).send(chats);
  } catch (e) {
    return res.status(500).send('Unable to receive chat');
  }
});

router.get('/chats/:id', checkAuth(), async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await getChat(id);
    return res.status(200).send(chat);
  } catch (e) {
    console.log(e);
    return res.status(500).send('Unable to receive chat');
  }
});

router.post('/chats', checkAuth(), async (req, res) => {
  try {
    const chat = await createChat(req.user._id, req.body);
    return res.status(201).send(chat);
  } catch (e) {
    console.log(e);
    return res.status(500).send('Unable to create chat');
  }
});

router.delete('/chats/:id', checkAuth(), checkRole(userRoles.admin), async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await deleteChat(req.user, id);
    if (chat) {
      return res.status(200).send(chat);
    }
    return res.status(500).send('You can\'t delete this chat!');
  } catch (e) {
    console.log(e);
    return res.status(500).send('Can\'t delete chat');
  }
});

router.patch('/chats/:id', checkAuth(), async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await updateChat(req.user, id, req.body);
    if (chat) {
      return res.status(200).send(chat);
    }
    return res.status(500).send('You can\'t update this chat!');
  } catch (e) {
    console.log(e);
    return res.status(500).send('Unable to update chat');
  }
});

module.exports = router;