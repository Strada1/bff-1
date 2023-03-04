const request = require('supertest');
const app = require('../server');
const createUser = require('./fixtures/user');

describe('/users', () => {
    let userId;
    const user = createUser();
    let userPass;
    let userEmail;

    it('POST', async () => {
        const { body } = await request(app)
            .post('/users')
            .send(user)
            .expect(201);
        expect(body.email).toEqual(user.email);
        userId = body._id;
        userPass = user.password;
        userEmail =  user.email;
    })

    it('PUT', async () => {
        const newUsername = user.username + 'New';
        const { body } = await request(app)
            .put(`/users/${userId}`)
            .send(newUsername)
            .expect(201);
        expect(body.username).toEqual(newUsername);
    })

    it('GET', async () => {
        const reqBody = {
            email: userEmail,
            password: userPass
        }
        const { body } = await request(app)
            .get(`/users/auth`)
            .send(reqBody)
            .expect(201);
    })

    it('GET', async () => {
        await request(app)
            .get(`/users}`)
            .expect(201);
    })


    it('DELETE', async () => {
        const { body } = await request(app)
            .delete(`/users/${userId}`)
            .expect(201);
    })

});
