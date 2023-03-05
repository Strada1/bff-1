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
// @ts-nocheck
const supertest_1 = __importDefault(require("supertest"));
const http_status_1 = __importDefault(require("http-status"));
const passport_1 = __importDefault(require("passport"));
const passportStrategies_1 = require("../middlewares/passportStrategies");
const server_1 = require("../server");
const const_1 = require("../shared/const");
const messages_model_1 = require("../models/messages.model");
const messagesService = __importStar(require("../services/messages.service"));
const usersService = __importStar(require("../services/users.service"));
const chatsService = __importStar(require("../services/chats.service"));
const chatsMock = __importStar(require("./fixtures/chats.fixture"));
const usersMock = __importStar(require("./fixtures/users.fixture"));
const messagesMock = __importStar(require("./fixtures/messages.fixture"));
const sharedMock = __importStar(require("./fixtures/shared.fixture"));
const messages_dto_1 = require("../dto/messages.dto");
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield messages_model_1.Message.deleteMany({});
}));
describe('GET /messages', () => {
    describe('request with a wrong role', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield messages_model_1.Message.deleteMany({});
        }));
        it(`should return a ${http_status_1.default.UNAUTHORIZED}`, () => __awaiter(void 0, void 0, void 0, function* () {
            passport_1.default.use('bearer', (0, passportStrategies_1.mockStrategy)({ roles: [const_1.ROLES.USER] }));
            yield (0, supertest_1.default)(server_1.app).get('/messages').expect(http_status_1.default.UNAUTHORIZED);
        }));
    });
    describe('request with a valid role', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield messages_model_1.Message.deleteMany({});
        }));
        it(`should return a ${http_status_1.default.OK} and messages`, () => __awaiter(void 0, void 0, void 0, function* () {
            passport_1.default.use('bearer', (0, passportStrategies_1.mockStrategy)({ roles: [const_1.ROLES.ADMIN] }));
            const createdChat = yield chatsService.createChat(chatsMock.chat);
            const createdUser = yield usersService.createUser(usersMock.userTemplate);
            yield usersService.addChatToUser(createdUser._id, createdChat._id);
            const message1 = yield messagesService.createMessage(createdChat._id, createdUser._id, messagesMock.message.text);
            const message2 = yield messagesService.createMessage(createdChat._id, createdUser._id, messagesMock.message.text);
            const { body } = yield (0, supertest_1.default)(server_1.app).get('/messages').expect(http_status_1.default.OK);
            expect(body).toEqual([
                sharedMock.jsonTransform((0, messages_dto_1.getMessageResponseDTO)(message1)),
                sharedMock.jsonTransform((0, messages_dto_1.getMessageResponseDTO)(message2)),
            ]);
        }));
    });
});
describe('GET /messages?chatId=', () => {
    describe('request with a valid query', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield messages_model_1.Message.deleteMany({});
        }));
        it(`should return a ${http_status_1.default.OK} and messages`, () => __awaiter(void 0, void 0, void 0, function* () {
            passport_1.default.use('bearer', (0, passportStrategies_1.mockStrategy)({ roles: [const_1.ROLES.ADMIN] }));
            const createdChat = yield chatsService.createChat(chatsMock.chat);
            const createdChat2 = yield chatsService.createChat({
                title: 'second chat',
            });
            const createdUser = yield usersService.createUser(usersMock.userTemplate);
            yield usersService.addChatToUser(createdUser._id, createdChat._id);
            yield usersService.addChatToUser(createdUser._id, createdChat2._id);
            const messageToFirstChat1 = yield messagesService.createMessage(createdChat._id, createdUser._id, messagesMock.message.text);
            const messageToFirstChat2 = yield messagesService.createMessage(createdChat._id, createdUser._id, messagesMock.message.text);
            yield messagesService.createMessage(createdChat2._id, createdUser._id, messagesMock.message.text);
            yield messagesService.createMessage(createdChat2._id, createdUser._id, messagesMock.message.text);
            const { body } = yield (0, supertest_1.default)(server_1.app)
                .get(`/messages?chatId=${createdChat._id}`)
                .expect(http_status_1.default.OK);
            expect(body).toEqual([
                sharedMock.jsonTransform((0, messages_dto_1.getMessageResponseDTO)(messageToFirstChat1)),
                sharedMock.jsonTransform((0, messages_dto_1.getMessageResponseDTO)(messageToFirstChat2)),
            ]);
        }));
    });
});
describe('GET /messages/:messageId', () => {
    describe('request with a wrong role', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield messages_model_1.Message.deleteMany({});
        }));
        it(`should return a ${http_status_1.default.UNAUTHORIZED}`, () => __awaiter(void 0, void 0, void 0, function* () {
            passport_1.default.use('bearer', (0, passportStrategies_1.mockStrategy)({ roles: [const_1.ROLES.USER] }));
            const createdChat = yield chatsService.createChat(chatsMock.chat);
            const createdUser = yield usersService.createUser(usersMock.userTemplate);
            yield usersService.addChatToUser(createdUser._id, createdChat._id);
            const createdMessage = yield messagesService.createMessage(createdChat._id, createdUser._id, messagesMock.message.text);
            yield (0, supertest_1.default)(server_1.app)
                .get(`/messages/${createdMessage._id}`)
                .expect(http_status_1.default.UNAUTHORIZED);
        }));
    });
    describe('request with a valid role', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield messages_model_1.Message.deleteMany({});
        }));
        it(`should return a ${http_status_1.default.OK}`, () => __awaiter(void 0, void 0, void 0, function* () {
            passport_1.default.use('bearer', (0, passportStrategies_1.mockStrategy)({ roles: [const_1.ROLES.ADMIN] }));
            const createdChat = yield chatsService.createChat(chatsMock.chat);
            const createdUser = yield usersService.createUser(usersMock.userTemplate);
            yield usersService.addChatToUser(createdUser._id, createdChat._id);
            const createdMessage = yield messagesService.createMessage(createdChat._id, createdUser._id, messagesMock.message.text);
            const { body } = yield (0, supertest_1.default)(server_1.app)
                .get(`/messages/${createdMessage._id}`)
                .expect(http_status_1.default.OK);
            expect(body).toEqual(sharedMock.jsonTransform((0, messages_dto_1.getMessageResponseDTO)(createdMessage)));
        }));
    });
});
describe('DELETE /messages/:messageId', () => {
    describe('request with a wrong role', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield messages_model_1.Message.deleteMany({});
        }));
        it(`should return a ${http_status_1.default.UNAUTHORIZED}`, () => __awaiter(void 0, void 0, void 0, function* () {
            passport_1.default.use('bearer', (0, passportStrategies_1.mockStrategy)({ roles: [const_1.ROLES.USER] }));
            const createdChat = yield chatsService.createChat(chatsMock.chat);
            const createdUser = yield usersService.createUser(usersMock.userTemplate);
            yield usersService.addChatToUser(createdUser._id, createdChat._id);
            const createdMessage = yield messagesService.createMessage(createdChat._id, createdUser._id, messagesMock.message.text);
            yield (0, supertest_1.default)(server_1.app)
                .delete(`/messages/${createdMessage._id}`)
                .expect(http_status_1.default.UNAUTHORIZED);
        }));
    });
    describe('request with a valid role', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield messages_model_1.Message.deleteMany({});
        }));
        it(`should return a ${http_status_1.default.NO_CONTENT}`, () => __awaiter(void 0, void 0, void 0, function* () {
            passport_1.default.use('bearer', (0, passportStrategies_1.mockStrategy)({ roles: [const_1.ROLES.ADMIN] }));
            const createdChat = yield chatsService.createChat(chatsMock.chat);
            const createdUser = yield usersService.createUser(usersMock.userTemplate);
            yield usersService.addChatToUser(createdUser._id, createdChat._id);
            const createdMessage = yield messagesService.createMessage(createdChat._id, createdUser._id, messagesMock.message.text);
            yield (0, supertest_1.default)(server_1.app)
                .delete(`/messages/${createdMessage._id}`)
                .expect(http_status_1.default.NO_CONTENT);
        }));
    });
});
