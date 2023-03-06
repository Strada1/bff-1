require('dotenv').config();
const mongoose = require('mongoose')
const url = process.env.MONGO_CONNECTION_STRING;

mongoose.set("strictQuery", false);
mongoose.connect(url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected MongoDB'))
  .catch(e => console.log(e))

module.exports = mongoose;