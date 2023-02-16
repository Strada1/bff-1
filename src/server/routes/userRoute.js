const { validationResult, body, param } = require("express-validator");
const express = require("express")
const { addUser, findUser, getAllUsers, updateUser, removeUser, authUser, isAdmin } = require("../services/userService");
const jwt = require("jsonwebtoken");
const { checkToken, createToken } = require("../helpers");
const app = express()

const paramValidator = param('userId').isMongoId().withMessage('userId must be MongoId');

const fieldValidators = [
  body('email').matches(/[a-zA-Zа-яА-Я0-9]/).trim().isLength({ min: 5 }).isEmail().optional().withMessage('Enter an email like xxx@xxx.xx'),
  body('password').matches(/[a-zA-Zа-яА-Я0-9]/).trim().isLength({ min: 5 }).optional().withMessage('password must contain only letters or numbers, min length 5 symbols'),
]

const createUser = app.post('/users', ...fieldValidators, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const { email, password, username, roles } = req.body
    const token = await createToken(email, password)
    await addUser(email, token, username, roles)
    return res.status(201).send('User created');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const getUsers = app.get('/users', ...fieldValidators, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    checkToken(req)

    const users = await getAllUsers()
    return res.status(201).send(users);
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const changeUser = app.put('/users/:userId', ...fieldValidators, paramValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    checkToken(req)

    const token = req.headers.authorization;
    const permission = await isAdmin(token)

    if (!permission) {
      return res.status(403).send('You don\'t have permission');
    }

    await updateUser(req.params.userId, req.body)
    return res.status(201).send('User change');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const deleteUser = app.delete('/users/:userId', paramValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    checkToken(req)

    const token = req.headers.authorization;
    const permission = await isAdmin(token)

    if (!permission) {
      return res.status(403).send('You don\'t have permission');
    }

    const user = await removeUser(req.params.userId)
    if (!user) return res.status(403).send('User is not found')
    return res.status(201).send(`User ${user?.username} deleted.`);
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const authUserWithToken = app.get('/users/authentication', ...fieldValidators, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    const token = await authUser(req.body)
    if (token) {
      return res.status(201).send(`Token: ${token}`);
    }
    return res.status(403).send('User is not found, invalid authentication, please check your email and password');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})


module.exports = { createUser, getUsers, changeUser, deleteUser, authUserWithToken }