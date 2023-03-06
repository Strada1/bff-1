const Message = require('../models/Message');
const User = require('../models/User');
const Chat = require('../models/Chat');


const isHaveAccess = async (userId, chatId) => {
    const chat = await Chat.findById(chatId);
    const user = await User.findById(userId);
    if (!chat || !user) return
    return (chat.users.includes(userId) || user.roles.includes('admin'))
}

const getAllMessages = (userId, chatId) => {
    return isHaveAccess(userId, chatId)
        ? Message.find({ chatId: chatId }).populate('user')
        : false
}

const getMessage = async (id) => {
    const mess = await Message.findById(id);
    return isHaveAccess(mess.userId, mess.chatId)
        ? mess
        : false
}

const createMessage = ({ userId, chatId, text }) => {
    return isHaveAccess(userId, chatId)
        ? Message.create({ userId, chatId, text })
        : false
}

const findAndUpdate = (id, body, options) => {
    return isHaveAccess(body.userId, body.chatId)
        ? Message.findByIdAndUpdate(id, body, options)
        : false
}

const findAndDelete = async (id) => {
    const mess = await Message.findById(id);
    return isHaveAccess(mess.userId, mess.chatId)
        ? Message.findByIdAndDelete(id)
        : false
}


module.exports = { getAllMessages, getMessage, createMessage, findAndUpdate, findAndDelete };