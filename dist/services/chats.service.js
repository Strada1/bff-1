"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeUserFromChat = exports.addUserToChat = exports.deleteChat = exports.updateChat = exports.createChat = exports.getChats = exports.getChatByTitle = exports.getChat = exports.getChatById = void 0;
const chats_model_1 = require("../models/chats.model");
const cache_service_1 = require("./cache.service");
const cachedChatsById = new cache_service_1.CacheService({ stdTTL: 10, checkperiod: 10 });
function getChatById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (cachedChatsById.has(id.toString())) {
            return cachedChatsById.get(id.toString());
        }
        const chat = yield chats_model_1.Chat.findById(id).lean();
        cachedChatsById.set(id.toString(), chat);
        return chat;
    });
}
exports.getChatById = getChatById;
function getChat(id) {
    return chats_model_1.Chat.findById(id);
}
exports.getChat = getChat;
function getChatByTitle(title) {
    return chats_model_1.Chat.findOne({ title });
}
exports.getChatByTitle = getChatByTitle;
function getChats() {
    return chats_model_1.Chat.find({});
}
exports.getChats = getChats;
function createChat(chat) {
    return __awaiter(this, void 0, void 0, function* () {
        return chats_model_1.Chat.create(chat);
    });
}
exports.createChat = createChat;
function updateChat(id, payload) {
    return __awaiter(this, void 0, void 0, function* () {
        cachedChatsById.delete(id.toString());
        return chats_model_1.Chat.findByIdAndUpdate(id, payload, { new: true }).lean();
    });
}
exports.updateChat = updateChat;
function deleteChat(id) {
    cachedChatsById.delete(id.toString());
    return chats_model_1.Chat.findByIdAndDelete(id);
}
exports.deleteChat = deleteChat;
function addUserToChat(chatId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        cachedChatsById.delete(chatId.toString());
        return chats_model_1.Chat.findByIdAndUpdate({ _id: chatId }, { $addToSet: { users: userId } }, { new: true });
    });
}
exports.addUserToChat = addUserToChat;
function removeUserFromChat(chatId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        cachedChatsById.delete(chatId.toString());
        return chats_model_1.Chat.findByIdAndUpdate({ _id: chatId }, { $pull: { users: userId } }, { new: true });
    });
}
exports.removeUserFromChat = removeUserFromChat;
