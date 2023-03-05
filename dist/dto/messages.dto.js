"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageResponseDTO = void 0;
function getMessageResponseDTO({ _id, user, text, chatId, createdAt, updatedAt, }) {
    return {
        _id,
        user,
        text,
        chatId,
        createdAt,
        updatedAt,
    };
}
exports.getMessageResponseDTO = getMessageResponseDTO;
