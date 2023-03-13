const http = require('http');
const WebSocket = require('ws');
const app = require('./app');
const usersService = require('./service/db/usersService');
const chatsService = require('./service/db/chatsService');
const httpServer = http.createServer(app);
const webSocketServer = new WebSocket.Server({server: httpServer});

const clients = {};

webSocketServer.on('connection', async (ws, request, client) => {
  const paramsString = request?.url?.split('?')[1];
  const params = Object.fromEntries(new URLSearchParams(paramsString));
  const token = params['token'];
  const chatId = params['chatId'];
  const chat = await chatsService.getChat(chatId);
  const chatUsers = chat?.users.map((user) => user.toString());
  console.log(chatUsers);
  const user = await usersService.getUserByToken(token);
  const userId = user?._id?.toString();
  if (userId) {
    clients[userId] = ws;
    ws.on('message', (message) => {
      chatUsers?.forEach((userId) => {
        if (clients[userId]) {
          return clients[userId].send(message);
        }
      });
    });

    ws.on('close', () => {
      clients[userId] = null;
    });
  }

  // ws.on('message', (message) => {
  //   webSocketServer.clients.forEach((client) => {
  //     return client.send(message);
  //   });
  // });
  // ws.on('error', (e) => ws.send(e));
});

// webSocketServer.on('close', (ws) => {
//   clients.delete(user._id);
//   console.log(clients);
//   ws.send('webSocket server disconnected');
// });

httpServer.listen(process.env.SERVER_PORT, () => {
  console.log(`http server listen on ${process.env.SERVER_PORT} port`);
});
