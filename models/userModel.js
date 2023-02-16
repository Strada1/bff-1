const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  username: String,
  roles: [String],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;