"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMessage = exports.deleteMessagesByChat = exports.createMessage = exports.getMessages = exports.getMessage = void 0;
const messages_model_1 = require("../models/messages.model");
function getMessage(messageId) {
    return messages_model_1.Message.findById(messageId);
}
exports.getMessage = getMessage;
function getMessages(options) {
    const query = messages_model_1.Message.find();
    if (options === null || options === void 0 ? void 0 : options.chatId) {
        query.where('chatId', options.chatId);
    }
    return query;
}
exports.getMessages = getMessages;
function createMessage(chatId, user, text) {
    return messages_model_1.Message.create({ chatId, user, text });
}
exports.createMessage = createMessage;
function deleteMessagesByChat(chatId) {
    return messages_model_1.Message.deleteMany({ chatId });
}
exports.deleteMessagesByChat = deleteMessagesByChat;
function deleteMessage(messageId) {
    return messages_model_1.Message.findByIdAndDelete(messageId);
}
exports.deleteMessage = deleteMessage;
