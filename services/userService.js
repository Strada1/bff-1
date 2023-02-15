const UserModel = require('../models/userModel');

const findAllUsers = () => { 
	return UserModel.find();
}

const createUser = ({ email, password, username, roles }) => { 
	return UserModel.create({ email, password, username, roles }); 
}

const findOneByCondition = ({email}) => { 
	return UserModel.findOne({ email: email });
}

module.exports = { findAllUsers, createUser, findOneByCondition };