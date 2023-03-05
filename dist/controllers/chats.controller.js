"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChat = exports.updateChat = exports.createChat = exports.getChatMessagesById = exports.getChats = exports.getChat = void 0;
const http_status_1 = __importDefault(require("http-status"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const ApiError_1 = __importDefault(require("../shared/ApiError"));
const chatsService = __importStar(require("../services/chats.service"));
const usersService = __importStar(require("../services/users.service"));
const messagesService = __importStar(require("../services/messages.service"));
const const_1 = require("../shared/const");
const chats_dto_1 = require("../dto/chats.dto");
exports.getChat = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.params;
    const chat = yield chatsService.getChat(chatId);
    if (!chat) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, const_1.ERROR_TEXT.CHATS.CHAT_NOT_FOUND);
    }
    res.status(http_status_1.default.OK).send((0, chats_dto_1.getChatFullResponseDTO)(chat));
}));
exports.getChats = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const chats = yield chatsService.getChats();
    res.status(http_status_1.default.OK).send((0, chats_dto_1.getChatsFullResponseDTO)(chats));
}));
exports.getChatMessagesById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chats } = req.user;
    const { chatId } = req.params;
    const userChats = chats === null || chats === void 0 ? void 0 : chats.map((chat) => chat._id.toString());
    const isUserHaveAccessToChat = userChats === null || userChats === void 0 ? void 0 : userChats.includes(chatId);
    if (!isUserHaveAccessToChat) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, const_1.ERROR_TEXT.AUTH.NOT_ENOUGH_RIGHTS);
    }
    const messages = yield messagesService.getMessages({ chatId });
    res.status(http_status_1.default.OK).send(messages);
}));
exports.createChat = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    const chat = yield chatsService.getChatByTitle(title);
    if (chat) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, const_1.ERROR_TEXT.CHATS.CHAT_EXIST);
    }
    const createdChat = yield chatsService.createChat({ title });
    res.status(http_status_1.default.CREATED).send((0, chats_dto_1.getChatFullResponseDTO)(createdChat));
}));
exports.updateChat = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.params;
    const { title } = req.body;
    const updatedChat = yield chatsService.updateChat(chatId, { title });
    if (!updatedChat) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, const_1.ERROR_TEXT.CHATS.CHAT_NOT_FOUND);
    }
    res.status(http_status_1.default.OK).send((0, chats_dto_1.getChatFullResponseDTO)(updatedChat));
}));
exports.deleteChat = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.params;
    const deletedChat = yield chatsService.deleteChat(chatId);
    if (!deletedChat) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, const_1.ERROR_TEXT.CHATS.CHAT_NOT_FOUND);
    }
    yield usersService.deleteChatFromUsers(chatId);
    yield messagesService.deleteMessagesByChat(chatId);
    res.status(http_status_1.default.NO_CONTENT).send();
}));
