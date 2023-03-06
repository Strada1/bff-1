const request = require('supertest');
const app = require('../server/app');
const db = require('../server/connectDB');
const { createMessage, deleteMessage } = require('./fixtures/messages');
const passport = require('passport');
const MockStrategy = require('passport-mock-strategy');
const { createChat, deleteChat } = require("./fixtures/chats");
const { createUser, deleteUser, clientData } = require("./fixtures/users");
const { createAuthData } = require("./fixtures/auth");
passport.use('bearer', new MockStrategy());
jest.spyOn(console, 'log').mockImplementation(() => null);

afterAll(async () => {
  app.close();
  db.connection.close();
});

describe('/messages', () => {
  it('GET MESSAGE', async () => {
    const message = await createMessage();
    const { body } = await request(app)
      .get(`/messages/${message._id}`)
      .expect(200);
    expect(body.text).toEqual(message.text);
    await deleteMessage(message._id);
  });

  it('POST MESSAGE', async () => {
    const user = await createUser();
    const clientAuthData = createAuthData(user.token);
    const chat = await createChat([ user._id ]);
    const message = {
      user: user._id,
      text: 'test message',
      chatId: chat._id
    };
    const { body } = await request(app)
      .post('/messages')
      .set(clientAuthData.key, clientAuthData.value)
      .send(message)
      .expect(201);
    expect(body.text).toEqual(message.text);
    await deleteUser(user._id);
    await deleteChat(chat._id);
    await deleteMessage(body._id);
  });

  it('UPDATE MESSAGE', async () => {
    const user = await createUser();
    const clientAuthData = createAuthData(user.token);
    const message = await createMessage(user._id);
    const newData = { text: 'new test messagetext' };
    const { body } = await request(app)
      .patch(`/messages/${message._id}`)
      .set(clientAuthData.key, clientAuthData.value)
      .send(newData)
      .expect(200);
    expect(body.text).toEqual(newData.text);
    await deleteUser(user._id);
    await deleteMessage(message._id);
  });

  it('DELETE MESSAGE', async () => {
    const user = await createUser();
    const clientData = createAuthData(user.token);
    const message = await createMessage(user._id);
    await request(app)
      .delete(`/messages/${message._id}`)
      .set(clientData.key, clientData.value)
      .expect(200);
    await deleteUser(user._id);
  });
});