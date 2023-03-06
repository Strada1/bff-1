const User = require('../models/User');
const Chat = require('../models/Chat');

const getAllUsers = () => {
	return User.find();
}

const getUser = (id) => {
	return User.findById(id);
}

const createUser = ({ email, token, username, roles }) => {
	return User.create({ email, token, username, roles });
}

const findOneByToken = (token) => {
	return User.findOne({ token: token });
}

const findAndUpdate = (id, body, options) => {
	return User.findByIdAndUpdate(id, body, options);
}

const findAndDelete = (id) => {
	return User.findByIdAndDelete(id);
}

const addChat = async (id, chatId, options) => {
	
	await  Chat.findByIdAndUpdate(chatId, { $addToSet: { users: id } });
	
	return User.findByIdAndUpdate(
		id,
		{ $addToSet: { chats: chatId } },
        options
)}

const removeChat = async (id, chatId, options) => {
	await Chat.findByIdAndUpdate(chatId, { $pull: { users: id } });
	
	return User.findByIdAndUpdate(
		id,
		{ $pull: { chats: chatId } },
		options
)}


module.exports = { getAllUsers,  getUser, createUser, findAndUpdate, findAndDelete, addChat, removeChat, findOneByToken };