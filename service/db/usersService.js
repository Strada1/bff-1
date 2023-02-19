const Users = require('../../models/Users');

const getUsers = async () => {
  const users = await Users.find({});
  return users;
};
const createUser = async (user) => {
  await Users.create(user);
};
const updateUser = async (user) => {};
const deleteUser = (userId) => {};

module.exports = {getUsers, createUser};
