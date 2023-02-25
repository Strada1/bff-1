const request = require('supertest');
const app = require('../server');
jest.spyOn(console, 'log').mockImplementation(() => '');
const createTestUser = require('./fixtures/usersTest');



describe('/users', () => {
    let userEmail;
    let userPass;
    let userId;

    it('POST', async () => {
        const user = createTestUser();
        const { body } = await request(app)
            .post('/users/create')
            .send(user)
            .expect(201);
        expect(body.email).toEqual(user.email);

        userEmail = user.email;
        userPass = user.password
        userId = body._id
    })

    
    it('POST with same email', async () => {
        const user = createTestUser();
        const { body } = await request(app)
            .post('/users/create')
            .send(user)
            .expect(500);
            expect(body.keyValue['email']).toEqual(user.email);
    })

    it('PUT with invalid email', async () => {
        const movie = createTestUser(['email'])
        const { body } = await request(app)
            .put(`/users/${userId}/edit/info`)
            .send(movie)
            .expect(400);
        expect(body.errors[0].param).toEqual('email');
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

        it('DELETE', async () => {
        const { body } = await request(app)
            .delete(`/users/${userId}`)
            .expect(201);
    })


    it('GET invalid id', async () => {
        await request(app)
            .get(`/users/${userId}`)
            .expect(404);
    })

    it('DELETE id not found', async () => {
        await request(app)
            .delete(`/users/${userId}`)
            .expect(400);
    })


    it('POST without email', async () => {
        const user = createTestUser(['email'])
        const { body } = await request(app)
            .post('/users/create')
            .send(user)
            .expect(400);
        expect(body.errors[0].param).toEqual('email');
    })

    it('POST with invalid path', async () => {
        const user = createTestUser()
        const { body } = await request(app)
            .post('/userssss')
            .send(user)
            .expect(404);
    })

});