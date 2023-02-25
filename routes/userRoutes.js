const express = require('express');
const router = express.Router();
const { createUser, findOneByEmail, findAndUpdate, findAndDelete } = require('../services/userService');
const { validate, authorization, authentication } = require('../middlewares');
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

      return res.status(201).send(user);
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
  authentication,
  authorization,  
  async (req, res) => {
    const { email, password, username, roles, favorites } = req.body;
    const id = req.params.userId;
    try {
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
  authentication,
  authorization,
  async (req, res) => {
    const id = req.params.userId;
    try {

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