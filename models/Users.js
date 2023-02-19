const {Schema, model} = require('../db');

const usersSchema = new Schema({
  email: String,
  username: String,
  roles: [String],
  password: String,
});

const Users = model('Users', usersSchema);

module.exports = Users;
