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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const messages_model_1 = require("../models/messages.model");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield messages_model_1.Message.deleteMany({});
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield messages_model_1.Message.deleteMany({});
}));
describe('GET /messages', () => {
    describe('request with a wrong role', () => {
        it(`should return a ${http_status_1.default.UNAUTHORIZED}`, () => __awaiter(void 0, void 0, void 0, function* () {
            // passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));
            // await request(app)
            //   .get(`/messages`)
            //   .expect(STATUS.UNAUTHORIZED);
        }));
    });
    describe('request with a valid role', () => {
        it(`should return a ${http_status_1.default.OK}`, () => __awaiter(void 0, void 0, void 0, function* () {
            // passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));
            // const { body } = await request(app)
            //   .delete(`/messages`)
            //   .expect(STATUS.OK);
        }));
    });
});
describe('GET /messages/chat/:chatId', () => {
    it(`should return a ${http_status_1.default.OK} and the messages`, () => __awaiter(void 0, void 0, void 0, function* () {
        // const createdUser = await createUser(usersMock.userRegistrationData);
        // const createdChat = await createChat(chatsMock.chat);
        // const mockMessages = generateMessagesMock(10, createdChat._id, createdUser._id);
        // const createdMessages = await Message.insertMany(mockMessages);
        // const { body } = await request(app).get('/messages/:chatId').expect(STATUS.OK);
        // expect(body).toEqual(mockMessages);
    }));
});
describe('POST /messages/chat/:chatId', () => {
    describe('request with a valid payload', () => {
        it(`should return a ${http_status_1.default.CREATED} and the message`, () => __awaiter(void 0, void 0, void 0, function* () {
            // passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));
            // const createdChat = await createChat(chatsMock.chat);
            // const { token } = await createUser(usersMock.userRegistrationData);
            // const { body } = await request(app)
            //   .post('/messages/:chatId')
            //   .set('Authorization', `Bearer ${token}`)
            //   .send(messagesMock.message)
            //   .expect(STATUS.CREATED);
            // expect(body.text).toEqual(usersMock.message.text);
        }));
    });
    describe('request with a wrong payload', () => {
        it(`should return a ${http_status_1.default.BAD_REQUEST}`, () => __awaiter(void 0, void 0, void 0, function* () {
            // passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));
            // const createdChat = await createChat(chatsMock.chat);
            // const { token } = await createUser(usersMock.userRegistrationData);
            // const { body } = await request(app)
            //   .post('/messages/:chatId')
            //   .set('Authorization', `Bearer ${token}`)
            //   .send({some: 'wrong data'})
            //   .expect(STATUS.BAD_REQUEST);
        }));
    });
});
describe('DELETE /messages/:messageId', () => {
    describe('request with a wrong role', () => {
        it(`should return a ${http_status_1.default.UNAUTHORIZED}`, () => __awaiter(void 0, void 0, void 0, function* () {
            // passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));
            // const createdMessage = await createMessage(messagesMock.message);
            // await request(app)
            //   .delete(`/messages/${createdMessage._id}`)
            //   .expect(STATUS.UNAUTHORIZED);
        }));
    });
    describe('request with a valid role', () => {
        it(`should return a ${http_status_1.default.NO_CONTENT}`, () => __awaiter(void 0, void 0, void 0, function* () {
            // passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));
            // const createdMessage = await createMessage(messagesMock.message);
            // const { body } = await request(app)
            //   .delete(`/messages/${createdMessage._id}`)
            //   .expect(STATUS.NO_CONTENT);
        }));
    });
});
