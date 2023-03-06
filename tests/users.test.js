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


describe('/users', () => {
    let userId;
    let user;
    let userPass;
    let userEmail;
    let auth;

    it('POST', async () => {
        user = createUser();
        auth = authData(user.token);
        const { body } = await request(app)
            .post('/users')
            .send(user)
            .expect(201);
        expect(body.email).toEqual(user.email);
        userId = body._id;
        userPass = user.password;
        userEmail = user.email;
    })


    it('GET', async () => {
        await request(app)
            .get(`/users`)
            .set(auth.key, auth.value)
            .expect(201);
    })


    it('GET', async () => {
        await request(app)
            .get(`/users/${userId}`)
            .set(auth.key, auth.value)
            .expect(201);
    })

    it('PUT', async () => {
        const newUsername = user.username + 'New';
        const { body } = await request(app)
            .put(`/users/${userId}`)
            .set(auth.key, auth.value)
            .send({ username: newUsername })
            .expect(201);
        expect(body.username).toEqual(newUsername);
        auth = authData(body.token);
    })

    it('DELETE', async () => {
        const { body } = await request(app)
            .delete(`/users/${userId}`)
            .set(auth.key, auth.value)
            .expect(201);
    })

});
