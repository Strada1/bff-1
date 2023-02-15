const express = require('express');
const router = express.Router();
const { findAllUsers, createUser, findOneByCondition } = require('../services/userService');
const { validateUser } = require('../middlewares');
const { userPostValidatorSchema } = require('../validatorSchema/user');

router.get('/', async (req, res) => {
  try {
    const users = await findAllUsers();
    return res.status(201).send(users);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/create',
  userPostValidatorSchema,
  validateUser,
  async (req, res) => {
    const { email, password, username, roles } = req.body;
    try {
      const user = await createUser({ email, password, username, roles });
      return res.status(201).send('user created');
    } catch (err) {
      return res.status(500).send(err);
    }
  });

router.get('/auth',
async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findOneByCondition({email});

    if (password.toString() !== user.password) {
      return res.status(401).send('Password does not match email');
    }

    return res.status(201).send(`${email} ${password}`);
  } catch (err) {
    return res.status(500).send(err);
  }
});


module.exports = router;