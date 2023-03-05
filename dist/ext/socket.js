"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wsStart = void 0;
const ws_1 = require("ws");
const config_1 = require("../config");
function wsStart(connectHandler) {
    const wss = new ws_1.WebSocketServer({ port: config_1.config.wsPort });
    if (!connectHandler) {
        console.log('required connect handler');
        return;
    }
    wss.on('connection', connectHandler);
    // wss.send('something');
}
exports.wsStart = wsStart;
