const mongoose = require('mongoose');
const url = process.env.MONGO_URL;


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });


module.exports = mongoose;
