const express = require('express');
const router = express.Router();
const { createUser, findOneByEmail, findAndUpdate, findOneByToken, findAndDelete } = require('../services/userService');
const { validate } = require('../middlewares');
const { userPostValidatorSchema, userDeleteValidatorSchema } = require('../validatorSchema/user');
const { createToken, verifyToken } = require('../helpers/token')

router.post('/create',
  userPostValidatorSchema,
  validate,
  async (req, res) => {
    const { email, password, username, roles, favorites } = req.body;
    try {
      const token = createToken(email, password);
      const user = await createUser({ email, token, username, roles, favorites });
      return res.status(201).send('user created');
    } catch (err) {
      return res.status(500).send(err);
    }
  });

router.get('/auth',
  userPostValidatorSchema,
  validate,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await findOneByEmail({ email });
      if (user === null) {
        return res.status(401).send('This user was not found');
      }

      const payload = verifyToken(user.token);

      if (password !== payload.password) {
        return res.status(401).send('Token does not found');
      }

      return res.status(201).send(user.token);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

router.put('/:userId/edit/info',
  userPostValidatorSchema,
  validate,
  async (req, res) => {
    const { email, password, username, roles, favorites } = req.body;
    const id = req.params.userId;
    try {

      const activeUser = await findOneByToken(req.user.token);
      const isAdmin = activeUser.roles.find(role => role === "admin");

      if (!isAdmin && email !== activeUser.email) {
        return res.status(201).send('Email not valid');
      }

      const token = createToken(email, password);
      const user = await findAndUpdate(id,
        {
          email: email,
          token: token,
          username: username,
          roles: roles,
          favorites: favorites,
        },
        { new: true });
      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

router.delete('/:userId',
  userDeleteValidatorSchema,
  validate,
  async (req, res) => {
    const id = req.params.userId;
    try {

      const activeUser = await findOneByToken(req.user.token);
      const isAdmin = activeUser.roles.find(role => role === "admin");

      if (!isAdmin && email !== activeUser.email) {
        return res.status(201).send('You do not have permission for this operation');
      }

      const deletedUser = await findAndDelete(id);
      if (!deletedUser) {
        return res.status(400).send('user not found');
      }

      return res.status(201).send('user deleted');
    } catch (err) {
      return res.status(500).send(err);
    }
  });


module.exports = router;