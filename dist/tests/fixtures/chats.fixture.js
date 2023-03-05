"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chat = exports.chats = exports.chatNames = void 0;
exports.chatNames = ['lorem', 'ipsum', 'dolor', 'sit', 'amet'];
exports.chats = exports.chatNames.map((chatName) => ({
    title: chatName,
}));
exports.chat = exports.chats[0];
