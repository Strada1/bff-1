const request = require('supertest');
const app = require('../server');
const createChat = require('./fixtures/chat');
const createUser = require('./fixtures/user');

describe('/chats', () => {
    let chatId;
    const user = createUser();
    let chat;

    it('POST', async () => {
        chat = createChat(user._id);
        const { body } = await request(app)
            .post('/chats')
            .send(chat)
            .expect(201);
        expect(body.title).toEqual(chat.title);
        chatId = body._id;
    })

    it('PUT', async () => {
        const newChatTitle = chat.title + 'New';
        const { body } = await request(app)
            .put(`/chats/${chatId}`)
            .send(newChatTitle)
            .expect(201);
        expect(body.title).toEqual(newChatTitle);
    })

    it('GET', async () => {
        await request(app)
            .get(`/chats}`)
            .expect(201);
    })

    it('GET chat Id', async () => {
        const { body } = await request(app)
            .get(`/chats/${chatId}`)
            .expect(201);
            expect(body._id).toEqual(chatId);
    })

    it('DELETE', async () => {
        const { body } = await request(app)
            .delete(`/chats/${chatId}`)
            .expect(201);
    })
});
