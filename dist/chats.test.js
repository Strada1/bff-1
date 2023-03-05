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
const chats_model_1 = require("./src/models/chats.model");
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield chats_model_1.Chat.deleteMany({});
}));
describe('GET /chats/', () => {
    it(`should return a ${http_status_1.default.OK} and the chats`, () => __awaiter(void 0, void 0, void 0, function* () {
        // beforeAll(async () => {
        //   await Chat.deleteMany({});
        // });
        // const createdChats = await Chat.insertMany(chatsMock.chats);
        // const { body } = await request(app).get('/messages').expect(STATUS.OK);
        // expect(body).toEqual(createdChats);
    }));
});
describe('POST /chats', () => {
    describe('request with a wrong role', () => {
        it(`should return a ${http_status_1.default.UNAUTHORIZED}`, () => __awaiter(void 0, void 0, void 0, function* () {
            // beforeAll(async () => {
            //   await Chat.deleteMany({});
            // });
            // passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));
            // const { token } = await createUser(usersMock.userRegistrationData);
            // const { body } = await request(app)
            //   .post('/chats')
            //   .set('Authorization', `Bearer ${token}`)
            //   .send(chatsMock.chat)
            //   .expect(STATUS.UNAUTHORIZED);
        }));
    });
    describe('request with a valid role', () => {
        it(`should return a ${http_status_1.default.CREATED} and the chat`, () => __awaiter(void 0, void 0, void 0, function* () {
            // beforeAll(async () => {
            //   await Chat.deleteMany({});
            // });
            // passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));
            // const { token } = await createUser(usersMock.userRegistrationData);
            // const { body } = await request(app)
            //   .post('/chats')
            //   .set('Authorization', `Bearer ${token}`)
            //   .send(chatsMock.chat)
            //   .expect(STATUS.CREATED);
            // expect(body.title).toEqual(chatsMock.chat.title);
        }));
    });
    describe('request with a valid role but wrong payload', () => {
        it(`should return a ${http_status_1.default.BAD_REQUEST}`, () => __awaiter(void 0, void 0, void 0, function* () {
            // beforeAll(async () => {
            //   await Chat.deleteMany({});
            // });
            // passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));
            // const { token } = await createUser(usersMock.userRegistrationData);
            // const { body } = await request(app)
            //   .post('/chats')
            //   .set('Authorization', `Bearer ${token}`)
            //   .send({title: ''})
            //   .expect(STATUS.BAD_REQUEST);
        }));
    });
});
describe('GET /chats/:chatId', () => {
    it(`should return a ${http_status_1.default.OK} and the chat`, () => __awaiter(void 0, void 0, void 0, function* () {
        // beforeAll(async () => {
        //   await Chat.deleteMany({});
        // });
        // passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));
        // const { token } = await createUser(usersMock.userRegistrationData);
        // const createdChat = await createChat(chatsMock.chat);
        // const { body } = await request(app).get(`/chats/${createdChat._id}`).expect(STATUS.OK);
        // expect(body).toEqual(createdChats);
    }));
});
describe('PUT /chats/:chatId', () => {
    describe('request with a wrong role', () => {
        it(`should return a ${http_status_1.default.UNAUTHORIZED}`, () => __awaiter(void 0, void 0, void 0, function* () {
            // beforeAll(async () => {
            //   await Chat.deleteMany({});
            // });
            // passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));
            // const newData = {title: 1}
            // const createdChat = await createChat(chatsMock.chat);
            // await request(app)
            //   .put(`/chats/${createdChat._id}`)
            //   .send(newData)
            //   .expect(STATUS.UNAUTHORIZED);
        }));
    });
    describe('request with a valid role', () => {
        it(`should return a ${http_status_1.default.OK}`, () => __awaiter(void 0, void 0, void 0, function* () {
            // beforeAll(async () => {
            //   await Chat.deleteMany({});
            // });
            // passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));
            // const newData = {title: 1}
            // const createdChat = await createChat(chatsMock.chat);
            // const { body } = await request(app)
            //   .put(`/messages/${createdChat._id}`)
            //   .send(newData)
            //   .expect(STATUS.OK);
            // expect(body.title).toEqual(newData.title);
        }));
    });
});
describe('DELETE /chats/:chatId', () => {
    describe('request with a wrong role', () => {
        it(`should return a ${http_status_1.default.UNAUTHORIZED}`, () => __awaiter(void 0, void 0, void 0, function* () {
            // beforeAll(async () => {
            //   await Chat.deleteMany({});
            // });
            // passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));
            // const createdChat = await createChat(chatsMock.chat);
            // await request(app)
            //   .delete(`/chats/${createdChat._id}`)
            //   .expect(STATUS.UNAUTHORIZED);
        }));
    });
    describe('request with a valid role', () => {
        it(`should return a ${http_status_1.default.NO_CONTENT}`, () => __awaiter(void 0, void 0, void 0, function* () {
            // beforeAll(async () => {
            //   await Chat.deleteMany({});
            // });
            // passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));
            // const createdChat = await createChat(chatsMock.chat);
            // const { body } = await request(app)
            //   .delete(`/messages/${createdChat._id}`)
            //   .expect(STATUS.NO_CONTENT);
        }));
    });
});
