const {Router} = require('express');
const passport = require('../middlewares/authStrategy');
const {body, param, query} = require('express-validator');
const {PATHS} = require('../constants');
const {getUser, getUserChats, addChat, deleteChat} = require('../controllers/users');
const validate = require('../middlewares/validate');

const router = Router();

router.get(PATHS.USERS.BY_ID, getUser);
router.get(PATHS.USERS.CHATS.ALL, getUserChats);
router.post(PATHS.USERS.CHATS.BY_ID, addChat);
router.delete(PATHS.USERS.CHATS.BY_ID, deleteChat);

module.exports = router;
