const Message = require('../../models/messageModel')

const createMessage = async (userId, chatId, text) => {

    return await Message.create({ user: userId, chatId: chatId, text });
};

module.exports = createMessage;