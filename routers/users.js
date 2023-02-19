const {Router} = require('express');
const {body} = require('express-validator');
const {PATHS} = require('../constants');
const {getUsers, createUser, updateUser, deleteUser} = require('../controllers/users');
const validate = require('../middlewares/validate');

const router = Router();

router.get(PATHS.USERS.ALL, validate, getUsers);

router.post(
  PATHS.USERS.ALL,
  [
    body('email').notEmpty().withMessage('the email field should not be empty'),
    body('username').notEmpty().withMessage('the username field should not be empty'),
    body('password').notEmpty().withMessage('the password field should not be empty'),
    body('roles').notEmpty().withMessage('the roles field should not be empty'),
  ],
  validate,
  createUser
);
router.put(PATHS.USERS.BY_ID, [], validate, updateUser);
router.delete(PATHS.USERS.BY_ID, [], validate, deleteUser);

module.exports = router;
