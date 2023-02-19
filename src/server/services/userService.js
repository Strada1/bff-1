const UserModel = require('../models/user')
const jwt = require("jsonwebtoken");

const userRoles = { client: 'client', admin: 'administrator' }

const addUser = async (email, token, username, roles = [userRoles.client]) => {
  return UserModel.create({ email, token, username, roles })
}

const getAllUsers = () => {
  return UserModel.find().lean()
}

const updateUser = (id, { email, roles, username }) => {
  const update = {
    email,
    roles,
    username,
  };
  return UserModel.findOneAndUpdate({ _id: id }, update, { new: true }).lean();
}

const removeUser = (id) => {
  return UserModel.findOneAndDelete({ _id: id })
}

const authUser = async ({ email, password }) => {
  const user = await UserModel.findOne({ email: email }).lean()
  if (!user) return undefined;
  const { token } = user;
  const decoded = await jwt.decode(token);
  if (password === decoded.password) return token
  return undefined;
}

const getUserByToken = async (token) => {
  const user = await UserModel.findOne({ token });
  if (!user) return undefined;
  return user;
}

module.exports = { addUser, getAllUsers, updateUser, removeUser, authUser, getUserByToken, userRoles }