const { ObjectId } = require('mongodb');
const { WebSocketServer } = require('ws');
const { getChat } = require('./services/chat');
const { getUserByToken } = require('./services/user');
const { createMessage } = require('./services/message');
const wss = new WebSocketServer({ port: process.env.WSS_PORT });

let wsUsers = [];

wss.on('connection', async (ws, { url }) => {
  const token = url.slice(1);
  try {
    const user = await getUserByToken(token);

    if (!user) {
      ws.send(JSON.stringify('You are not authorized'));
      ws.close();
      return;
    }

    wsUsers.push({ token, chats: user.chats, ws });
    ws.send(JSON.stringify('Connected'));

    ws.on('close', () => {
      wsUsers = wsUsers.filter((user) => user.token !== token);
      return;
    });

    ws.on('message', onMessage(ws, user._id));
  } catch (error) {
    ws.send(JSON.stringify({ error: error.message }));
    wsUsers = wsUsers.filter((user) => user.token !== token);
    ws.close();
    console.log(error);
  }
});

const onMessage = (ws, userId) => {
  return async function (data) {
    try {
      const userMessage = !data.toString()
        ? false
        : JSON.parse(data.toString());
      if (!userMessage || typeof userMessage !== 'object') {
        ws.send(JSON.stringify('Bad request!'));
        return;
      }
      const isMessageValid = await validateMessage(userMessage);
      if (!isMessageValid) {
        ws.send(JSON.stringify('Message not valid'));
        return;
      }
      const message = await createMessage(userMessage, userId);
      if (!message) {
        ws.send(JSON.stringify('Failed to create message'));
        return;
      }
      const addressees = wsUsers.filter((user) =>
        user.chats.includes(message.chat)
      );
      addressees.forEach((user) => {
        user.ws.send(JSON.stringify(message));
      });
    } catch (error) {
      ws.send(JSON.stringify({ error: error.message }));
    }
  };
};

async function validateMessage(message) {
  if (!message.text?.length || typeof message.text !== 'string') {
    return false;
  }
  if (!ObjectId.isValid(message.chat)) {
    return false;
  }
  return getChat(message.chat);
}

module.exports = wss;