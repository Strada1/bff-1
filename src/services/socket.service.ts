import { WebSocketServer, WebSocket, ServerOptions } from 'ws';

export interface ExtendedWebSocket extends WebSocket {
  user?: { _id?: string; username?: string };
}

export class ExtendedWebSocketServer extends WebSocketServer {
  clients: Set<ExtendedWebSocket>;

  constructor(options?: ServerOptions) {
    super(options);
    this.clients = new Set();
  }
}

export function wsStart(connectHandler: any, port: number) {
  const wss = new ExtendedWebSocketServer({ port });

  if (!connectHandler) {
    console.log('required connect handler');
    return;
  }

  wss.on('connection', (ws, req) => connectHandler(ws, req, wss));
  console.log(`wss running at ws://127.0.0.1:${port}`);

  return wss;
}
