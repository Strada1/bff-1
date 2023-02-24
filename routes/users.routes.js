const { Router } = require('express');
const {
  createUser,
  authUser,
} = require('../controllers/users.controller');

const router = Router();

router
  .post('/users/register', createUser)
  .post('/users/login', authUser);

module.exports = router;
