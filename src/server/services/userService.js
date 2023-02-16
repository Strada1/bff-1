const UserModel = require('../models/user')

const addUser = (data) => {
  return UserModel.create(data)
}

const getAllUsers = () => {
  return UserModel.find().lean()
}

const updateUser = (id, { email, password, username }) => {
  const update = {
    email,
    password,
    username,
  };
  return UserModel.findOneAndUpdate(id, update, { new: true });
}

const removeUser = (id) => {
  return UserModel.findOneAndDelete({ _id: id })
}

const findUser = ({ email, password }) => {
  return UserModel.findOne({ email: email, password: password }).lean()
}

module.exports = { addUser, getAllUsers, updateUser, removeUser, findUser }