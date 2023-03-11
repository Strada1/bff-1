const http = require('http');
const WebSocket = require('ws');
const app = require('./app');

const httpServer = http.createServer(app);
const webSocketServer = new WebSocket.Server({server: httpServer});

webSocketServer.on('connection', (ws) => {
  ws.on('message', (message) => {
    webSocketServer.clients.forEach((client) => client.send(message));
  });
  ws.on('error', (e) => ws.send(e));
  ws.send('webSocket server connected');
});

webSocketServer.on('close', (ws) => {
  ws.send('webSocket server disconnected');
});

httpServer.listen(process.env.SERVER_PORT, () => {
  console.log(`http server listen on ${process.env.SERVER_PORT} port`);
});
