const User = require('../models/User')

const userRoles = { client: 'client', admin: 'administrator' };

const getUserByToken = (token) => {
  return User.findOne({ token }).lean();
};

const getUsers = () => {
  return User.find().lean()
}

const getUser = (id) => {
  return User.findById({ _id: id }).lean().populate('chats');
}

const createUser = ({ username, email, token, roles = [userRoles.admin] }) => {
  return User.create({ username, email, token, roles })
}

const deleteUser = async (currentUser, id) => {
  const user = await User.findById({ _id: id });
  if (user._id === currentUser._id || currentUser.roles.includes(userRoles.admin)) {
    return User.findByIdAndDelete({ _id: id }).lean();
  }
  return false;
};

const updateUser = async (currentUser, id, { username }) => {
  const user = await User.findById({ _id: id });
  if (user._id === currentUser._id || currentUser.roles.includes(userRoles.admin)) {
    return User.findByIdAndUpdate({ _id: id }, { username }, {
      new: true
    }).lean();
  }
  return false;
};

module.exports = {
  userRoles,
  getUserByToken,
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
}