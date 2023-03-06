const Chat = require('../models/Chat');
const User = require('../models/User');

const getAllChats = () => {
    return Chat.find();
}

const getChat = (id) => {
    return Chat.findById(id);
}

const creatChat = (title, usersId) => {

    //const newChat = Chat.create( title, { $addToSet: { users: { $each: usersId } } }); 
    const newChat = Chat.create({ title, users: usersId });

    User.updateMany(
        { _id: { $in: usersId } },
        { $addToSet: { chats: newChat._id } }
    );
    return newChat;
}

const findAndUpdate = async (id, body, options) => {
    const { title, users } = body;
    const updatedChat = Chat.findByIdAndUpdate(id, { title: title, $addToSet: { users: { $each: users } } }, options);

    await User.updateMany(
        { _id: { $in: users } },
        { $addToSet: { chats: id } }
    );

    return updatedChat;
}

const findAndDelete = async (id) => {
    await User.updateMany({}, { $pull: { chats: id } });
    return Chat.findByIdAndDelete(id);
}


module.exports = { getAllChats, getChat, creatChat, findAndUpdate, findAndDelete };