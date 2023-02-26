const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique : true },
  token: { type: String, required: true },
  username: String,
  roles: [String],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true }],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;