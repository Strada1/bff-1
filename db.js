const mongoose = require('mongoose');
const {DB_OPTIONS} = require('./config');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_CONNECTION_STRING, DB_OPTIONS, () => console.log('Connected to MongoDB'));

module.exports = mongoose;
