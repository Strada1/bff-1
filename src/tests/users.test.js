const request = require('supertest');
const app = require('../server/app');
const db = require('../server/connectDB');
const { createUser, deleteUser, clientData } = require('./fixtures/users');
const passport = require('passport');
const MockStrategy = require('passport-mock-strategy');
const { createAuthData } = require("./fixtures/auth");
passport.use('bearer', new MockStrategy());
jest.spyOn(console, 'log').mockImplementation(() => null);

afterAll(async () => {
  app.close();
  db.connection.close();
});

describe('/users', () => {
  it('GET USER', async () => {
    const user = await createUser();
    const clientAuthData = createAuthData(user.token);
    const { body } = await request(app)
      .get(`/users/${user._id}`)
      .set(clientAuthData.key, clientAuthData.value)
      .expect(200);
    expect(body.username).toEqual(user.username);
    await deleteUser(user._id);
  });

  it('POST USER', async () => {
    const { body } = await request(app)
      .post('/users')
      .send(clientData)
      .expect(201);
    expect(body.username).toEqual(clientData.username);
    await deleteUser(body._id);
  });

  it('UPDATE USER', async () => {
    const admin = await createUser(true);
    const adminAuthData = createAuthData(admin.token);
    const newData = { username: 'current username NEW' };
    const { body } = await request(app)
      .patch(`/users/${admin._id}`)
      .set(adminAuthData.key, adminAuthData.value)
      .send(newData)
      .expect(200);
    expect(body.username).toEqual(newData.username);
    await deleteUser(admin._id);
  });

  it('DELETE USER', async () => {
    const admin = await createUser(true);
    const adminAuthData = createAuthData(admin.token);
    await request(app)
      .delete(`/users/${admin._id}`)
      .set(adminAuthData.key, adminAuthData.value)
      .expect(200);
  });
});