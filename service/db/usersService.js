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
const findUser = async ({email, password}) => {
  const user = await Users.findOne({
    email: email,
  });
  return user;
};
module.exports = {getUsers, createUser, updateUser, deleteUser, findUser};
