"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatsFullResponseDTO = exports.getChatFullResponseDTO = exports.getChatListResponseDTO = exports.getChatResponseDTO = void 0;
function getChatResponseDTO({ _id, title, users }) {
    return {
        _id,
        title,
        users,
    };
}
exports.getChatResponseDTO = getChatResponseDTO;
function getChatListResponseDTO(chats) {
    return chats.map(getChatResponseDTO);
}
exports.getChatListResponseDTO = getChatListResponseDTO;
function getChatFullResponseDTO({ _id, title, users, createdAt, updatedAt, }) {
    return {
        _id,
        title,
        users,
        createdAt,
        updatedAt,
    };
}
exports.getChatFullResponseDTO = getChatFullResponseDTO;
function getChatsFullResponseDTO(chats) {
    return chats.map(getChatFullResponseDTO);
}
exports.getChatsFullResponseDTO = getChatsFullResponseDTO;
