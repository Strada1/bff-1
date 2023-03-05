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
const messagesService = __importStar(require("./services/messages.service"));
const usersService = __importStar(require("./services/users.service"));
const chatsService = __importStar(require("./services/chats.service"));
const const_1 = require("./shared/const");
const helpers_1 = require("./shared/helpers");
const validations_1 = require("./shared/validations");
function sendMessageToClients({ clients, chatUsers, message, sender, }) {
    clients.forEach((client) => {
        var _a, _b;
        const isClientReady = client.readyState === ws_1.WebSocket.OPEN;
        const isClientHaveAccessToChat = chatUsers.includes((_b = (_a = client.user) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString());
        if (isClientReady && isClientHaveAccessToChat) {
            client.send(JSON.stringify({
                text: message.text,
                chatId: message.chatId,
                sender,
            }));
        }
    });
}
function handleMessage({ message, chatId }, ws, wss) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const senderId = (_a = ws.user) === null || _a === void 0 ? void 0 : _a._id;
            const chat = yield chatsService.getChatById(chatId);
            const chatUsers = (_b = chat === null || chat === void 0 ? void 0 : chat.users) === null || _b === void 0 ? void 0 : _b.map((user) => user.toString());
            const isSenderHaveAccessToChat = chatUsers === null || chatUsers === void 0 ? void 0 : chatUsers.includes(senderId);
            if (!(chat === null || chat === void 0 ? void 0 : chat._id)) {
                return ws.send(JSON.stringify({ meta: const_1.ERROR_TEXT.CHATS.CHAT_NOT_FOUND }));
            }
            if (!isSenderHaveAccessToChat) {
                ws.send(JSON.stringify({
                    meta: const_1.ERROR_TEXT.AUTH.NOT_ENOUGH_RIGHTS,
                }));
                return;
            }
            const createdMessage = yield messagesService.createMessage(chat._id, senderId, message);
            sendMessageToClients({
                clients: wss.clients,
                chatUsers: chatUsers,
                message: createdMessage,
                sender: ws.user,
            });
        }
        catch (error) {
            console.log(error);
            ws.send(JSON.stringify({ meta: const_1.ERROR_TEXT.SERVER.INTERNAL_ERROR }));
        }
    });
}
function onConnection(ws, req, wss) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = (0, helpers_1.getTokenFromBearerString)(req.headers.authorization);
        const currentUser = yield usersService.getUserByToken(token);
        if (!currentUser) {
            ws.send(const_1.ERROR_TEXT.AUTH.NOT_ENOUGH_RIGHTS);
            ws.close(const_1.WS_STATUSES.UNAUTHORIZED);
            return;
        }
        ws.user = { _id: currentUser._id.toString(), username: currentUser.username };
        ws.send('Connected');
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
            handleMessage({ message, chatId }, ws, wss);
        });
    });
}
exports.onConnection = onConnection;
