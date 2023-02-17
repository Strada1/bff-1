const express = require('express');
const router = express.Router();
const { createUser, findOneByEmail } = require('../services/userService');
const { validate } = require('../middlewares');
const { userPostValidatorSchema } = require('../validatorSchema/user');
const { createToken, verifyToken } = require('../helpers/token')

router.post('/create',
  userPostValidatorSchema,
  validate,
  async (req, res) => {
    const { email, password, username, roles } = req.body;
    try {
      const token = createToken(email, password);
      const user = await createUser({ email, token, username, roles });
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


module.exports = router;