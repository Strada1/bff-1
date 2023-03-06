const express = require('express');
const { getUsers, getUser, createUser, deleteUser, updateUser, userRoles } = require("../services/user");
const router = express.Router();
const User = require('../models/User')
const { createToken, checkRole, checkAuth } = require("../api/auth");

router.get('/users', checkAuth(), async (req, res) => {
  try {
    const users = await getUsers();
    return res.status(200).send(users);
  } catch (e) {
    console.log(e);
    return res.status(500).send('Unable to get users');
  }
});

router.get('/users/:id', checkAuth(), async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUser(id);
    return res.status(200).send(user);
  } catch (e) {
    console.log(e);
    return res.status(500).send('Unable to get user');
  }
});

router.post('/users', async (req, res) => {
  try {
    const { email, password, username, roles } = req.body
    const isMailExists = await User.findOne({ email })
    if (isMailExists) {
      return res.status(403).send('This mail already exists.')
    }
    const token = await createToken(email, password)
    const user = await createUser({ email, username, token, roles });
    return res.status(201).send(user);
  } catch (e) {
    console.log(e);
    return res.status(500).send('Unable to create user');
  }
});

router.delete('/users/:id', checkAuth(), async (req, res) => {
  try {
    const { id } = req.params;
    const user = await deleteUser(req.user, id);
    if (user) {
      return res.status(200).send(user);
    }
    return res.status(403).send('You can\'t delete this user');
  } catch (e) {
    console.log(e);
    return res.status(500).send('Unable to delete user');
  }
});

router.patch('/users/:id', checkAuth(), async (req, res) => {
  try {
    const { id } = req.params;
    const user = await updateUser(req.user, id, req.body);
    if (user) {
      return res.status(200).send(user);
    }
    return res.status(403).send('You can\'t update this user');
  } catch (e) {
    console.log(e);
    return res.status(500).send('Unable to update user');
  }
});

module.exports = router;