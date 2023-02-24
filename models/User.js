const mongoose = require('../db');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  username: String,
  roles: [String],
  password: String,
});

const UserModal = mongoose.model('Users', UserSchema);

module.exports = {
  UserModal,
};
