const {Schema, model} = require('../db');

const chatsSchema = new Schema({
  title: String,
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
  ],
});

const Chats = model('Chats', chatsSchema);

module.exports = Chats;
