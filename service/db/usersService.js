const Users = require('../../models/Users');

const getUsers = async () => {
  const users = await Users.find({});
  return users;
};
const getUserById = async (userId) => {
  const user = await Users.findById(userId);
  return user;
};
const createUser = async ({email, username, password, roles}) => {
  const token = await generateAccessToken({email, password});
  await Users.create({email, username, token, roles});
};
const updateUser = async (user) => {};
const deleteUser = async (userId) => {
  await Users.findByIdAndDelete(userId);
};
const findUser = async ({email, password}) => {
  const user = await Users.findOne({
    email: email,
  });
  return user;
};
const findUserByToken = async (token, cb) => {
  const user = await Users.findOne({
    token: token,
  });
  if (user) return cb(null, user);
  return cb(null, null);
};
module.exports = {getUsers, getUserById, createUser, updateUser, deleteUser, findUser, findUserByToken};
