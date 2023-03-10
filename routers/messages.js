const {Router} = require('express');
const {body, param} = require('express-validator');
const {PATHS} = require('../constants');
const {getMessages, addMessage, updateMessage, deleteMessage} = require('../controllers/messages');
const validate = require('../middlewares/validate');

const router = Router();

router.get(PATHS.USERS.CHATS.MESSAGES.ALL, getMessages);
router.post(PATHS.USERS.CHATS.MESSAGES.ALL, addMessage);
router.put(PATHS.USERS.CHATS.MESSAGES.BY_ID, updateMessage);
router.delete(PATHS.USERS.CHATS.MESSAGES.BY_ID, deleteMessage);

module.exports = router;
