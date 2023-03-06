require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT
const chats = require('./routes/chats')
const messages = require('./routes/messages')
const users = require('./routes/users')

const allowedOrigins = [
  `http://localhost:${port}`
];

app.use(cors({
  origin: allowedOrigins
}));

app.use(express.json());

app.get('/', (req, res) => {
  try {
    return res.status(200).send('Chats');
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
app.use(chats, messages, users);

module.exports = app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`)
});
