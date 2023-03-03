const mongoose = require('../db');
const { ObjectId } = require('mongodb');

const ChatSchema = new mongoose.Schema({
  title: String,
  users: [[{ type: ObjectId, ref: 'User' }]]
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;