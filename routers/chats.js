const {Router} = require('express');
const {body, param} = require('express-validator');
const {PATHS} = require('../constants');
const {getChats, createChat, updateChat, deleteChat} = require('../controllers/chats');

const validate = require('../middlewares/validate');

const router = Router();

router.get(PATHS.CHATS.ALL, getChats);
router.post(PATHS.CHATS.ALL, createChat);
router.put(PATHS.CHATS.BY_ID, updateChat);
router.delete(PATHS.CHATS.BY_ID, deleteChat);

module.exports = router;
