const mongoose = require('../connectDB')
const { ObjectId } = require('mongodb')

const MessageSchema = new mongoose.Schema({
  users: ObjectId,
  text: String,
  created_at: Date,
  update_at: Date,
  chat_id: ObjectId,
})

module.exports = mongoose.model('Message', MessageSchema)