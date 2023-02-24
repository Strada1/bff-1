const {Schema, model} = require('../db');

const usersSchema = new Schema({
  email: String,
  username: String,
  favorites: [],
  roles: {
    type: [String],
    default: 'user',
  },
  token: String,
});

const Users = model('Users', usersSchema);

module.exports = Users;
