const {describe, expect, it} = require('@jest/globals');
const request = require('supertest');
const app = require('../app');

const userToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEiLCJwYXNzd29yZCI6IjEiLCJpYXQiOjE2NzY5NzExMDF9.CG1cxGmv5bDKzxi_cOvJ3YcjvaiOVhzHRE_E4pzTmlA';
const userId = '640b1677445675d885e968b9';
const chatId = '640b132dfeb3d28652c60575';
const messageId = '640b17d1602c2fbdfb7dac83';
const message = {
  user: '640b1677445675d885e968b9',
  text: 'hi world',
  chatId: '640b132dfeb3d28652c60575',
};

describe('GET /users/:userId/chats/:chatId/messages', () => {
  it('should return the messages of this chat', async () => {
    const res = await request(app).get(`/users/${userId}/chats/${chatId}/messages`).auth(userToken, {type: 'bearer'});
    expect(res.statusCode).toBe(200);
  });
});

describe('POST /users/:userId/chats/:chatId/messages', () => {
  it('should add new message to chat', async () => {
    const res = await request(app)
      .post(`/users/${userId}/chats/${chatId}/messages`)
      .send(message)
      .auth(userToken, {type: 'bearer'});
    expect(res.statusCode).toBe(201);
  });
});

describe('PUT /users/:userId/chats/:chatId/messages/:messageId', () => {
  it('should update message from chat', async () => {
    const res = await request(app)
      .put(`/users/${userId}/chats/${chatId}/messages/${messageId}`)
      .send(message)
      .auth(userToken, {type: 'bearer'});
    expect(res.statusCode).toBe(201);
  });
});

describe('DELETE /users/:userId/chats/:chatId/messages/:messageId', () => {
  it('should delete message from chat', async () => {
    const res = await request(app).delete(`/users/${userId}/chats/${chatId}/messages/${messageId}`);

    expect(res.statusCode).toBe(200);
  });
});
