const mongoose = require('../connectDB')
const { ObjectId } = require('mongodb')

const ChatSchema = new mongoose.Schema({
  users: [{ type: ObjectId, ref: 'User' }],
  title: String,
  manager: [{ type: ObjectId, ref: 'User' }],
  messages: [{ type: ObjectId, ref: 'Message' }]
})

module.exports = mongoose.model('Chat', ChatSchema)