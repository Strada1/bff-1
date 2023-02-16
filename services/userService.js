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

const findOneByToken = ({token}) => { 
	return UserModel.findOne({ token: token });
}

module.exports = { findAllUsers, createUser, findOneByEmail, findOneByToken };