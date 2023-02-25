const { Router } = require('express');
const {
  createUser,
  authUser,
} = require('../controllers/users.controller');
const { userRegisterValidation, userLoginValidation } = require('../validation/validation');
const { handleValidationErrors } = require('../middleware/handleValidationErrors');

const router = Router();

router
  .post('/users/register', userRegisterValidation, handleValidationErrors, createUser)
  .post('/users/login', userLoginValidation, authUser);

module.exports = router;
