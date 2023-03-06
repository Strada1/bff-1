const User = require('../../server/models/User');
const jwt = require('jsonwebtoken');

const clientData = {
  email: 'clienttest@mail.ru',
  username: 'clienttesting',
  password: 'clientpassword',
  chats: [],
  roles: ['client']
};

const adminData = {
  email: 'admintest@mail.ru',
  username: 'admintesting',
  password: 'adminpassword',
  chats: [],
  roles: ['administrator']
};

const createUser = (isAdmin = false) => {
  const data = isAdmin ? adminData : clientData;
  data.token = jwt.sign(
    { email: data.email, password: data.password },
    'hello2my1liebe3'
  );
  return User.create(data);
};

const deleteUser = (id) => {
  return User.findByIdAndDelete({ _id: id }).lean();
};

const updateUser = (id, { username }) => {
  return User.findByIdAndUpdate({ _id: id }, { username }).lean();
};

module.exports = { createUser, deleteUser, updateUser, clientData, adminData };