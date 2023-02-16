const UserModel = require('../models/user')
const jwt = require("jsonwebtoken");

const userRoles = { client: 'client', admin: 'administrator' }

const addUser = async (email, token, username, roles = [userRoles.client]) => {
  return UserModel.create({ email, token, username, roles })
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

const authUser = async ({ email, password }) => {
  const user = await UserModel.findOne({ email: email }).lean()
  const { token } = user;
  const decoded = await jwt.decode(token);
  if (password === decoded.password) return token
}

const isAdmin = async (token) => {
  const user = await UserModel.findOne({ token })
  return (user && user.roles.includes(userRoles.admin))
}

module.exports = { addUser, getAllUsers, updateUser, removeUser, authUser, isAdmin }