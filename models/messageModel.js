const mongoose = require('../db');
const { ObjectId } = require('mongodb');

const MessageSchema = mongoose.Schema({ 
    user: { type: ObjectId, ref: 'User' },
    chatId: { type: Number, required: true, unique : true },
    text: String
  });

const Message = mongoose.model('Message', MessageSchema); 

module.exports = Message;