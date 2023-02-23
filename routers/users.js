const {Router} = require('express');
const passport = require('../middlewares/authStrategy');
const {body, param} = require('express-validator');
const {PATHS} = require('../constants');
const {getUsers, getUserById, createUser, updateUser, deleteUser} = require('../controllers/users');
const validate = require('../middlewares/validate');
const {authorizationForAdmin, authorizationForUser} = require('../middlewares/authorization');

const router = Router();

router.use(passport.authenticate('bearer', {session: false}));

router.get(PATHS.USERS.ALL, validate, authorizationForAdmin, getUsers);
router.get(
  PATHS.USERS.BY_ID,
  [param('userId').notEmpty().withMessage('the userId param should not be empty')],
  validate,
  authorizationForUser,
  getUserById
);
router.post(
  PATHS.USERS.ALL,
  [
    body('email').notEmpty().withMessage('the email field should not be empty'),
    body('username').notEmpty().withMessage('the username field should not be empty'),
    body('password').notEmpty().withMessage('the password field should not be empty'),
  ],
  validate,
  authorizationForUser,
  createUser
);
router.put(PATHS.USERS.BY_ID, [], validate, authorizationForUser, updateUser);
router.delete(PATHS.USERS.BY_ID, [], validate, authorizationForUser, deleteUser);

module.exports = router;
