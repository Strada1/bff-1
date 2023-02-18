const UserModel = require('../models/userModel');

const findAllUsers = () => { 
	return UserModel.find();
}

const createUser = ({ email, token, username, roles }) => { 
	return UserModel.create({ email, token, username, roles }); 
}

const findOneByEmail = ({email}) => { 
	return UserModel.findOne({ email: email });
}

const findOneByToken = (token) => { 
	console.log('TOKEN+++', token)
	return UserModel.findOne({ token: token });
}

const findAndUpdate = (id, body, options) => {
	return UserModel.findByIdAndUpdate(id, body, options);
}

const findAndDelete = (id) => {
	return UserModel.findByIdAndDelete(id);
}

module.exports = { findAllUsers, createUser, findOneByEmail, findOneByToken, findAndUpdate,  findAndDelete};