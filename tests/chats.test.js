const request = require('supertest');
const app = require('../server');
const createUser = require('./fixtures/user');
const authData = require('./fixtures/authData')
const User = require('../models/User')
const Chat = require('../models/Chat')


beforeAll(async () => {
    await User.deleteMany({});
    await Chat.deleteMany({});
  });


describe('/chats', () => {
    let chatId;
    let usersId;
    let chatTitle;
    let auth;
    let title = 'TestTitle'

    it('POST', async () => {
        const user = await createUser(true, true);
        auth = authData(user.token);
        usersId = user._id;
        const { body } = await request(app)
            .post('/chats')
            .send({title, usersId})
            .set(auth.key, auth.value)
            .expect(201);
        expect(body.title).toEqual(title);
        chatId = body._id;
        chatTitle = body.title
        
    })

    it('PUT', async () => {
        const newChatTitle = title + 'New';
        const { body } = await request(app)
            .put(`/chats/${chatId}`)
            .send({title: newChatTitle, usersId: usersId})
            .set(auth.key, auth.value)
            .expect(201);
        expect(body.title).toEqual(newChatTitle);
    })

    it('GET', async () => {
        await request(app)
            .get(`/chats`)
            .set(auth.key, auth.value)
            .expect(201);
    })

    it('GET chat Id', async () => {
        const { body } = await request(app)
            .get(`/chats/${chatId}`)
            .set(auth.key, auth.value)
            .expect(201);
            expect(body._id).toEqual(chatId);
    })

    it('DELETE', async () => {
        const { body } = await request(app)
            .delete(`/chats/${chatId}`)
            .set(auth.key, auth.value)
            .expect(201);
    })
});
