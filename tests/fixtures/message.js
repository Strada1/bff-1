const Message = require('../../models/Message')

const createMessage = async (userId, chatId, text) => {

    return await Message.create({ user: userId, chatId: chatId, text });
};

module.exports = createMessage;