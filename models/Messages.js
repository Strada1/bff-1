const {Schema, model} = require('../db');

const messagesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  text: String,
  chatId: {
    type: Schema.Types.ObjectId,
    ref: 'Chats',
  },
});

const Messages = model('Messages', messagesSchema);

module.exports = Messages;
