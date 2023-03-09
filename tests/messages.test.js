const {describe, expect, it} = require('@jest/globals');
const request = require('supertest');
const app = require('../app');

const userToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEiLCJwYXNzd29yZCI6IjEiLCJpYXQiOjE2NzY5NzExMDF9.CG1cxGmv5bDKzxi_cOvJ3YcjvaiOVhzHRE_E4pzTmlA';
const userId = '';
const chatId = '';
const messageId = '';
const message = {
  test: '',
};

describe('GET /users/:userId/chats/:chatId/messages', () => {
  it('should return the messages of this chat', async () => {
    const res = await request(app).get(`/users/${userId}/chats/${chatId}/messages`).auth(userToken, {type: 'bearer'});
    expect(res.statusCode).toBe(404);
  });
});

describe('POST /users/:userId/chats/:chatId/messages', () => {
  it('should add new message to chat', async () => {
    const res = await request(app)
      .post(`/users/${userId}/chats/${chatId}/messages`)
      .send(message)
      .auth(userToken, {type: 'bearer'});
    expect(res.statusCode).toBe(404);
  });
});

describe('DELETE /users/:userId/chats/:chatId/messages/:messageId', () => {
  it('should delete message from chat', async () => {
    const res = await request(app)
      .delete(`/users/${userId}/chats/${chatId}/messages/${messageId}`)
      .auth(userToken, {type: 'bearer'});
    expect(res.statusCode).toBe(404);
  });
});
