const usersService = require('../service/db/usersService');

const getUsers = async (req, res) => {
  try {
    const users = await usersService.getUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).send(error);
  }
};
const getUserById = async (req, res) => {
  try {
    return res.status(201).json(req.user);
  } catch (error) {
    return res.status(500).send(error);
  }
};
const createUser = async (req, res) => {
  try {
    await usersService.createUser(req.body);
    return res.status(201).send('user created');
  } catch (error) {
    return res.status(500).send(error);
  }
};
const updateUser = async (req, res) => {
  try {
    return res.status(201).send('user updated');
  } catch (error) {
    return res.status(500).send(error);
  }
};
const deleteUser = async (req, res) => {
  try {
    await usersService.deleteUser(req.params['userId']);
    return res.status(201).send('user deleted');
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {getUsers, getUserById, createUser, updateUser, deleteUser};
