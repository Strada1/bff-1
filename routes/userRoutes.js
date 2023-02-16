const express = require('express');
const router = express.Router();
const { createUser, findOneByEmail } = require('../services/userService');
const { validateUser } = require('../middlewares');
const { userPostValidatorSchema } = require('../validatorSchema/user');
const jwt = require('jsonwebtoken');

router.post('/create',
  userPostValidatorSchema,
  validateUser,
  async (req, res) => {
    const { email, password, username, roles } = req.body;
    try {
      const token = await jwt.sign({email, password}, process.env.JWT_SECRET);
      const user = await createUser({ email, token, username, roles });
      return res.status(201).send('user created');
    } catch (err) {
      return res.status(500).send(err);
    }
  });

router.get('/auth',
userPostValidatorSchema,
validateUser,
async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findOneByEmail({ email });
    console.log('user', user)
    if (user === null) {
      return res.status(401).send('This user was not found');
    }

    const payload = await jwt.verify(user.token, process.env.JWT_SECRET);

    if (password !== payload.password) {
      return res.status(401).send('Token does not found');
    }

    return res.status(201).send(user.token);
  } catch (err) {
    return res.status(500).send(err);
  }
});


module.exports = router;