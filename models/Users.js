const {Schema, model} = require('../db');

const usersSchema = new Schema({
  email: String,
  username: String,
  token: String,
  chats: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Chats',
    },
  ],
});

const Users = model('Users', usersSchema);

module.exports = Users;
