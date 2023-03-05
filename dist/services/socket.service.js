"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wsStart = exports.ExtendedWebSocketServer = void 0;
const ws_1 = require("ws");
class ExtendedWebSocketServer extends ws_1.WebSocketServer {
    constructor(options) {
        super(options);
        this.clients = new Set();
    }
}
exports.ExtendedWebSocketServer = ExtendedWebSocketServer;
function wsStart(connectHandler, port) {
    const wss = new ExtendedWebSocketServer({ port });
    if (!connectHandler) {
        console.log('required connect handler');
        return;
    }
    wss.on('connection', (ws, req) => connectHandler(ws, req, wss));
    console.log(`wss running at ws://127.0.0.1:${port}`);
    return wss;
}
exports.wsStart = wsStart;
