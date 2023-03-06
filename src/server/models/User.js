const mongoose = require('../connectDB')
const { ObjectId } = require('mongodb')

const UserSchema = new mongoose.Schema({
  email: String,
  username: String,
  token: String,
  chats: [{ type: ObjectId, ref: 'Chat' }],
  roles: [],
})

module.exports = mongoose.model('User', UserSchema)