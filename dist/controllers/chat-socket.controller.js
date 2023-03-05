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
Object.defineProperty(exports, "__esModule", { value: true });
exports.onConnection = void 0;
const ws_1 = require("ws");
const usersService = __importStar(require("../services/users.service"));
const chatsService = __importStar(require("../services/chats.service"));
const const_1 = require("../shared/const");
const helpers_1 = require("../shared/helpers");
const validations_1 = require("../shared/validations");
function sendMessagesToClients(wss, users, message) {
    wss.clients.forEach((client) => {
        if (client.readyState === ws_1.WebSocket.OPEN &&
            users.includes(client.userId)) {
            client.send(JSON.stringify({ message }));
        }
    });
}
function onMessage({ message, chatId }, ws, wss) {
    return __awaiter(this, void 0, void 0, function* () {
        const chat = yield chatsService.getChatById(chatId);
        if (!chat) {
            return ws.send(JSON.stringify({ meta: const_1.ERROR_TEXT.CHATS.CHAT_NOT_FOUND }));
        }
        const users = chat.users.map((user) => user.toString());
        const isChatIncludesCurrentUser = users.includes(ws.userId);
        if (!isChatIncludesCurrentUser) {
            ws.send(JSON.stringify({
                meta: const_1.ERROR_TEXT.AUTH.NOT_ENOUGH_RIGHTS,
            }));
            return;
        }
        sendMessagesToClients(wss, users, message);
    });
}
function onConnection(ws, req, wss) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = (0, helpers_1.getTokenFromBearerString)(req.headers.authorization);
        const currentUser = yield usersService.getUserByToken(token);
        if (!currentUser) {
            ws.send(const_1.ERROR_TEXT.AUTH.NOT_ENOUGH_RIGHTS);
            ws.close(4001);
            return;
        }
        ws.userId = currentUser._id.toString();
        ws.on('error', console.error);
        ws.on('message', (data) => {
            const { message, chatId } = JSON.parse(data.toString());
            const { isValidPayload, error } = (0, validations_1.messagePayloadValidation)({
                message,
                chatId,
            });
            if (!isValidPayload) {
                return ws.send(JSON.stringify({ meta: error }));
            }
            return onMessage({ message, chatId }, ws, wss);
        });
    });
}
exports.onConnection = onConnection;
