"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersResponseDTO = exports.getUserResponseDTO = exports.getFullUserResponseDTO = void 0;
function getFullUserResponseDTO({ _id, email, username, token, roles, favorites, createdAt, updatedAt, }) {
    return {
        _id,
        email,
        username,
        token,
        roles,
        favorites,
        createdAt,
        updatedAt,
    };
}
exports.getFullUserResponseDTO = getFullUserResponseDTO;
function getUserResponseDTO({ _id, username, roles, favorites, createdAt, updatedAt, }) {
    return {
        _id,
        username,
        roles,
        favorites,
        createdAt,
        updatedAt,
    };
}
exports.getUserResponseDTO = getUserResponseDTO;
function getUsersResponseDTO(users) {
    return users.map(getUserResponseDTO);
}
exports.getUsersResponseDTO = getUsersResponseDTO;
