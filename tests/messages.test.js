const request = require('supertest');
const app = require('../server');
const createChat = require('./fixtures/chat');
const createUser = require('./fixtures/user');
const authData = require('./fixtures/authData')
const User = require('../models/User')
const Chat = require('../models/Chat')
const Message = require('../models/Message')

beforeAll(async () => {
    await User.deleteMany({});
    await Chat.deleteMany({});
    await Message.deleteMany({});
});

describe('/messages', () => {
    let messageId;
    let user;
    let chat;
    const text = 'test';
    let auth;

    it('POST', async () => {
        user = await createUser(true, { isMessage: true });
        chat = await createChat(user._id);
        auth = authData(user.token);
        const { body } = await request(app)
            .post('/messages')
            .send({ userId: user._id, chatId: chat._id, text: text },)
            .set(auth.key, auth.value)
            .expect(201);
        expect(body.text).toEqual(text);
        messageId = body._id;
    })

    it('PUT', async () => {
        const newText = text + 'New';
        const { body } = await request(app)
            .put(`/messages/${messageId}`)
            .send({ text: newText })
            .set(auth.key, auth.value)
            .expect(201);
        expect(body.text).toEqual(newText);
    })

    it('GET message Id', async () => {
        const { body } = await request(app)
            .get(`/messages/${messageId}`)
            .expect(201)
            .set(auth.key, auth.value)
        expect(body._id).toEqual(messageId);
    })

    it('DELETE', async () => {
        const { body } = await request(app)
            .delete(`/messages/${messageId}`)
            .set(auth.key, auth.value)
            .expect(201);

    })
});
