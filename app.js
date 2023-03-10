require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {CORS_OPTIONS} = require('./config');

const app = express();
const usersRoute = require('./routers/users');
const chatsRoute = require('./routers/chats');
const messagesRoute = require('./routers/messages');

app.use(express.json());
app.use(cors(CORS_OPTIONS));
app.use(usersRoute);
app.use(chatsRoute);
app.use(messagesRoute);

module.exports = app;
