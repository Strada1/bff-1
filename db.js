const {DB} = require('./constants');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(DB.URL, DB.OPTIONS, () => console.log('Connected to MongoDB'));

module.exports = mongoose;
