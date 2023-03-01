const {generateAccessToken} = require('../../middlewares/authenticate');
const Users = require('../../models/Users');

const getUsers = async () => {
  const users = await Users.find({});
  return users;
};
const getUserById = async (userId) => {
  const user = await Users.findById(userId);
  return user;
};
const createUser = async ({email, username, password}) => {
  const token = await generateAccessToken({email, password});
  await Users.create({email, username, token});
};
const updateUser = async (userId, {email, username}) => {
  await Users.findByIdAndUpdate(userId, {
    $set: {
      email,
      username,
    },
  });
};
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

const addMovieInFavorite = async (userId, movieId) => {
  console.log('userId -> ', userId);
  console.log('movieId -> ', movieId);
  await Users.findByIdAndUpdate(userId, {
    $addToSet: {
      favorites: movieId,
    },
  });
};
module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  findUser,
  findUserByToken,
  addMovieInFavorite,
};
