"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersResponseDTO = exports.getUserResponseDTO = exports.getFullUserResponseDTO = void 0;
const chats_dto_1 = require("./chats.dto");
function getFullUserResponseDTO({ _id, email, username, token, roles, chats, createdAt, updatedAt, }) {
    return {
        _id,
        email,
        username,
        token,
        roles,
        chats: (0, chats_dto_1.getChatListResponseDTO)(chats !== null && chats !== void 0 ? chats : []),
        createdAt,
        updatedAt,
    };
}
exports.getFullUserResponseDTO = getFullUserResponseDTO;
function getUserResponseDTO({ _id, username, roles, chats, createdAt, updatedAt, }) {
    return {
        _id,
        username,
        roles,
        chats,
        createdAt,
        updatedAt,
    };
}
exports.getUserResponseDTO = getUserResponseDTO;
function getUsersResponseDTO(users) {
    return users.map(getUserResponseDTO);
}
exports.getUsersResponseDTO = getUsersResponseDTO;
