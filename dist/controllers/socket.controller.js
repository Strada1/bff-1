"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onConnection = void 0;
function onMessage(data) {
    console.log('received: %s', data);
}
function onConnection(wss) {
    wss.on('error', console.error);
    wss.on('message', onMessage);
}
exports.onConnection = onConnection;
