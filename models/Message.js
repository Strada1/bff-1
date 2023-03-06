const mongoose = require('../db');
const { ObjectId } = require('mongodb');

const MessageSchema = mongoose.Schema({ 
    userId: { type: ObjectId, ref: 'User' },
    chatId: { type: ObjectId, ref: 'Chat' },
    text: String
  });

const Message = mongoose.model('Message', MessageSchema); 

module.exports = Message;