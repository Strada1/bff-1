const request = require('supertest');
const app = require('../server');
const createChat = require('./fixtures/chat');
const createUser = require('./fixtures/user');
const createMessage = require('./fixtures/message');

describe('/messages', () => {
    let messageId;
    const user = createUser();
    const chat = createChat(user._id);
    const text = 'test';

    it('POST', async () => {
        const message = createMessage(user._id, chat._id, text);
        const { body } = await request(app)
            .post('/messages')
            .send(message)
            .expect(201);
        expect(body.text).toEqual(message.text);
        messageId = body._id;
    })

    it('PUT', async () => {
        const newText = text + 'New';
        const { body } = await request(app)
            .put(`/messages/${messageId}`)
            .send(newText)
            .expect(201);
        expect(body.text).toEqual(newText);
    })

    it('GET message Id', async () => {
        const { body } = await request(app)
            .get(`/messages/${messageId}`)
            .expect(201);
            expect(body._id).toEqual(chatId);
    })

    it('DELETE', async () => {
        const { body } = await request(app)
            .delete(`/messages/${messageId}`)
            .expect(201);
    })
});
