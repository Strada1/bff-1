const { validationResult, body, param } = require("express-validator");
const express = require("express")
const { addUser, findUser, getAllUsers, updateUser, removeUser } = require("../services/userService");
const app = express()

const paramValidator = param('userId').isMongoId().withMessage('userId must be MongoId');

const fieldValidators = [
  body('email').matches(/[a-zA-Zа-яА-Я0-9]/).trim().isLength({ min: 5 }).isEmail().optional().withMessage('Enter an email like xxx@xxx.xx'),
  body('password').matches(/[a-zA-Zа-яА-Я0-9]/).trim().isLength({ min: 5 }).optional().withMessage('password must contain only letters or numbers, min length 5 symbols'),
]

const createUser = app.post('/users', ...fieldValidators, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      await addUser(req.body)
      return res.status(201).send('User created');
    } else {
      return res.status(400).send({ errors: errors.array() });
    }
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const getUsers = app.get('/users', ...fieldValidators, async (req, res) => {
  try {
    const token = req.headers.authorization
    if (!token) return res.status(400).send('Not authenticated');

    const [email, password] = token.split(' ')
    const isAuth = await findUser({ email, password })
    const errors = validationResult(req);
    if (errors.isEmpty() && isAuth) {
      const users = await getAllUsers()
      return res.status(201).send(users);
    } else {
      return res.status(400).send({ errors: errors.array() });
    }
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const changeUser = app.put('/users/:userId', ...fieldValidators, paramValidator, async (req, res) => {
  try {
    const token = req.headers.authorization
    if (!token) return res.status(400).send('Not authenticated');

    const [email, password] = token.split(' ')
    const isAuth = await findUser({ email, password })
    const errors = validationResult(req);
    if (errors.isEmpty() && isAuth) {
      await updateUser(req.params.userId, req.body)
      return res.status(201).send('User change');
    } else {
      return res.status(400).send({ errors: errors.array() });
    }
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const deleteUser = app.delete('/users/:userId', paramValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const user = await removeUser(req.params.userId)
      if (!user) return res.status(403).send('User is not found')
      return res.status(201).send(`User ${user?.username} deleted.`);
    } else {
      return res.status(400).send({ errors: errors.array() });
    }
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const checkUser = app.get('/users/authentication', ...fieldValidators, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const user = await findUser(req.body)
      if (user) {
        return res.status(201).send(`${user?.email} ${user?.password}`);
      } else {
        return res.status(201).send('User is not found');
      }
    } else {
      return res.status(400).send({ errors: errors.array() });
    }
  } catch (e) {
    return res.status(500).send(e.message);
  }
})


module.exports = { createUser, getUsers, changeUser, deleteUser, checkUser }