const mongoose = require('../db');
const { ObjectId } = require('mongodb');

const MessageSchema = mongoose.Schema({ 
    user: { type: ObjectId, ref: 'User' },
    text: String,    
    chatId: { type: Number, required: true, unique : true }
  });

const Message = mongoose.model('Message', MessageSchema); 

module.exports = Message;