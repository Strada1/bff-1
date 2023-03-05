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
const users_model_1 = require("../models/users.model");
const usersService = __importStar(require("../services/users.service"));
const chatsService = __importStar(require("../services/chats.service"));
const usersMock = __importStar(require("./fixtures/users.fixture"));
const sharedMock = __importStar(require("./fixtures/shared.fixture"));
const chatsMock = __importStar(require("./fixtures/chats.fixture"));
const users_dto_1 = require("../dto/users.dto");
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield users_model_1.User.deleteMany({});
}));
describe('GET /users', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield users_model_1.User.deleteMany({});
    }));
    it(`should return a ${http_status_1.default.OK} and the users`, () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUsers = usersMock.generateUsersMock(10);
        const createdUsers = yield users_model_1.User.insertMany(mockUsers);
        const { body } = yield (0, supertest_1.default)(server_1.app).get('/users').expect(http_status_1.default.OK);
        expect(body).toEqual(sharedMock.jsonTransform((0, users_dto_1.getUsersResponseDTO)(createdUsers)));
    }));
});
describe('GET /users/:userId', () => {
    describe('given the user does not exist', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield users_model_1.User.deleteMany({});
        }));
        it(`should return a ${http_status_1.default.NOT_FOUND}`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(server_1.app)
                .get(`/users/${usersMock.wrongUserId}`)
                .expect(http_status_1.default.NOT_FOUND);
        }));
    });
    describe('given the user does exist', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield users_model_1.User.deleteMany({});
        }));
        it(`should return a ${http_status_1.default.OK} and the user`, () => __awaiter(void 0, void 0, void 0, function* () {
            const createdUser = yield usersService.createUser(usersMock.userTemplate);
            yield (0, supertest_1.default)(server_1.app).get(`/users/${createdUser._id}`).expect(http_status_1.default.OK);
        }));
    });
});
describe('POST /users', () => {
    describe('request with wrong payload', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield users_model_1.User.deleteMany({});
        }));
        it(`should return a ${http_status_1.default.BAD_REQUEST}`, () => __awaiter(void 0, void 0, void 0, function* () {
            const wrongPayload = {
                email: '1',
                password: '2',
            };
            yield (0, supertest_1.default)(server_1.app)
                .post('/users')
                .send(wrongPayload)
                .expect(http_status_1.default.BAD_REQUEST);
        }));
    });
    describe('request with valid payload', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield users_model_1.User.deleteMany({});
        }));
        it(`should return a ${http_status_1.default.CREATED} and the user`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(server_1.app)
                .post('/users')
                .send(usersMock.userTemplate)
                .expect(http_status_1.default.CREATED);
        }));
    });
});
describe('PUT /users/:userId', () => {
    describe('request with a wrong role', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield users_model_1.User.deleteMany({});
        }));
        it(`should return a ${http_status_1.default.UNAUTHORIZED}`, () => __awaiter(void 0, void 0, void 0, function* () {
            passport_1.default.use('bearer', (0, passportStrategies_1.mockStrategy)({ roles: [const_1.ROLES.USER] }));
            const createdUser = yield usersService.createUser(usersMock.userTemplate);
            yield (0, supertest_1.default)(server_1.app)
                .put(`/users/${createdUser._id}`)
                .send({ username: 'test' })
                .expect(http_status_1.default.UNAUTHORIZED);
        }));
    });
    describe('request with a valid role', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield users_model_1.User.deleteMany({});
        }));
        it(`should return a ${http_status_1.default.OK} and the user`, () => __awaiter(void 0, void 0, void 0, function* () {
            passport_1.default.use('bearer', (0, passportStrategies_1.mockStrategy)({ roles: [const_1.ROLES.ADMIN] }));
            const createdUser = yield usersService.createUser(usersMock.userTemplate);
            const payload = { username: 'test' };
            const { body } = yield (0, supertest_1.default)(server_1.app)
                .put(`/users/${createdUser._id}`)
                .send(payload)
                .expect(http_status_1.default.OK);
            expect(body.username).toEqual(payload.username);
        }));
    });
    describe('request with a valid role but wrong payload', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield users_model_1.User.deleteMany({});
        }));
        it(`should return a ${http_status_1.default.BAD_REQUEST}`, () => __awaiter(void 0, void 0, void 0, function* () {
            passport_1.default.use('bearer', (0, passportStrategies_1.mockStrategy)({ roles: [const_1.ROLES.ADMIN] }));
            const createdUser = yield usersService.createUser(usersMock.userTemplate);
            const wrongPayload = {
                email: '1',
                password: '2',
            };
            yield (0, supertest_1.default)(server_1.app)
                .put(`/users/${createdUser._id}`)
                .send(wrongPayload)
                .expect(http_status_1.default.BAD_REQUEST);
        }));
    });
});
describe('DELETE /users/:userId', () => {
    describe('request with a wrong role', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield users_model_1.User.deleteMany({});
        }));
        it(`should return a ${http_status_1.default.UNAUTHORIZED}`, () => __awaiter(void 0, void 0, void 0, function* () {
            passport_1.default.use('bearer', (0, passportStrategies_1.mockStrategy)({ roles: [const_1.ROLES.USER] }));
            const createdUser = yield usersService.createUser(usersMock.userTemplate);
            yield (0, supertest_1.default)(server_1.app)
                .delete(`/users/${createdUser._id}`)
                .expect(http_status_1.default.UNAUTHORIZED);
        }));
    });
    describe('request with a valid role', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield users_model_1.User.deleteMany({});
        }));
        it(`should return a ${http_status_1.default.NO_CONTENT}`, () => __awaiter(void 0, void 0, void 0, function* () {
            passport_1.default.use('bearer', (0, passportStrategies_1.mockStrategy)({ roles: [const_1.ROLES.ADMIN] }));
            const createdUser = yield usersService.createUser(usersMock.userTemplate);
            yield (0, supertest_1.default)(server_1.app)
                .delete(`/users/${createdUser._id}`)
                .expect(http_status_1.default.NO_CONTENT);
        }));
    });
});
describe('POST /users/me/chats', () => {
    describe('request with a wrong payload', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield users_model_1.User.deleteMany({});
        }));
        it(`should return a ${http_status_1.default.BAD_REQUEST}`, () => __awaiter(void 0, void 0, void 0, function* () {
            passport_1.default.use('bearer', passportStrategies_1.tokenStrategy);
            const createdUser = yield usersService.createUser(usersMock.userTemplate);
            yield (0, supertest_1.default)(server_1.app)
                .post('/users/me/chats')
                .set('Authorization', `Bearer ${createdUser.token}`)
                .send({ chatId: 1 })
                .expect(http_status_1.default.BAD_REQUEST);
        }));
    });
    describe('request with a valid payload', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield users_model_1.User.deleteMany({});
        }));
        it(`should return a ${http_status_1.default.OK} and the user`, () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            passport_1.default.use('bearer', passportStrategies_1.tokenStrategy);
            const createdChat = yield chatsService.createChat(chatsMock.chat);
            const createdUser = yield usersService.createUser(usersMock.userTemplate);
            const { body } = yield (0, supertest_1.default)(server_1.app)
                .post('/users/me/chats')
                .set('Authorization', `Bearer ${createdUser.token}`)
                .send({ chatId: createdChat._id })
                .expect(http_status_1.default.OK);
            const chat = yield chatsService.getChat(createdChat._id);
            const isUserAddedToChat = (_a = chat === null || chat === void 0 ? void 0 : chat.users) === null || _a === void 0 ? void 0 : _a.includes(createdUser._id);
            expect(body.chats[0]._id).toEqual(createdChat._id.toString());
            expect(isUserAddedToChat).toBeTruthy();
        }));
    });
});
describe('DELETE /users/me/chats', () => {
    describe('request with a wrong payload', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield users_model_1.User.deleteMany({});
        }));
        it(`should return a ${http_status_1.default.BAD_REQUEST}`, () => __awaiter(void 0, void 0, void 0, function* () {
            passport_1.default.use('bearer', passportStrategies_1.tokenStrategy);
            const createdUser = yield usersService.createUser(usersMock.userTemplate);
            yield (0, supertest_1.default)(server_1.app)
                .delete('/users/me/chats')
                .set('Authorization', `Bearer ${createdUser.token}`)
                .send({ chatId: '' })
                .expect(http_status_1.default.BAD_REQUEST);
        }));
    });
    describe('with a valid payload', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield users_model_1.User.deleteMany({});
        }));
        it(`should return a ${http_status_1.default.OK} and the user`, () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            passport_1.default.use('bearer', passportStrategies_1.tokenStrategy);
            const createdChat = yield chatsService.createChat(chatsMock.chat);
            const createdUser = yield usersService.createUser(usersMock.userTemplate);
            yield usersService.addChatToUser(createdUser._id, createdChat._id);
            yield chatsService.addUserToChat(createdChat._id, createdUser._id);
            const { body } = yield (0, supertest_1.default)(server_1.app)
                .delete('/users/me/chats')
                .set('Authorization', `Bearer ${createdUser.token}`)
                .send({ chatId: createdChat._id })
                .expect(http_status_1.default.OK);
            const chat = yield chatsService.getChat(createdChat._id);
            const isUserRemovedFromChat = !((_a = chat === null || chat === void 0 ? void 0 : chat.users) === null || _a === void 0 ? void 0 : _a.includes(createdUser._id));
            expect(body.chats).not.toEqual(expect.arrayContaining([createdChat._id.toString()]));
            expect(isUserRemovedFromChat).toBeTruthy();
        }));
    });
});
