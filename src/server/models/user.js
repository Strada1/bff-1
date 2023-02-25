const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  favorites: [{ type: ObjectId, ref: 'Movie' }],
  username: String,
  roles: [String]
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel