const mongoose = require('../db');
const { ObjectId } = require('mongodb');

const UserSchema = mongoose.Schema({
  email: { type: String, required: true, unique : true },
  username: { type: String, required: true, unique : true },
  token: { type: String, required: true },
  chats: [{ type: ObjectId, ref: 'Chat' }],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;