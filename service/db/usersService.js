const jwt = require('jsonwebtoken');
const {generateAccessToken} = require('../auth/loginService');
const Users = require('../../models/Users');

const getUsers = async () => {
  const users = await Users.find({});
  return users;
};
const createUser = async ({email, username, password, roles}) => {
  const token = await generateAccessToken({email, password});
  await Users.create({email, username, token, roles});
};
const updateUser = async (user) => {};
const deleteUser = async (userId) => {
  await Users.findByIdAndDelete(userId);
};

module.exports = {getUsers, createUser, updateUser, deleteUser};
