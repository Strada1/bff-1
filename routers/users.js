const {Router} = require('express');
const passport = require('../middlewares/authStrategy');
const {body, param, query} = require('express-validator');
const {PATHS} = require('../constants');
const {getUser, getUserChats, addChat, deleteChat} = require('../controllers/users');
const validate = require('../middlewares/validate');
const {authorizationForAdmin, authorizationForUser} = require('../middlewares/authorization');

const router = Router();

router.use(passport.authenticate('bearer', {session: false}));

router.get(
  PATHS.USERS.BY_ID,
  // [param('userId').notEmpty().withMessage('the userId param should not be empty')],
  // validate,
  // authorizationForUser,
  getUser
);

router.get(PATHS.USERS.CHATS.ALL, getUserChats);
router.post(PATHS.USERS.CHATS.ALL, addChat);
router.delete(PATHS.USERS.CHATS.ALL, deleteChat);

module.exports = router;
