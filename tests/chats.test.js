const {describe, expect, it} = require('@jest/globals');
const request = require('supertest');
const app = require('../app');

const userToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEiLCJwYXNzd29yZCI6IjEiLCJpYXQiOjE2NzY5NzExMDF9.CG1cxGmv5bDKzxi_cOvJ3YcjvaiOVhzHRE_E4pzTmlA';

describe('GET /chats', () => {
  it('should return a list of chats that the user is a member of', async () => {
    const res = await request(app).get('/chats').auth(userToken, {type: 'bearer'});
    expect(res.statusCode).toBe(404);
  });
});

describe('GET /chats/:chatId', () => {
  it('should return the messages of this chat', async () => {
    const res = await request(app).get('/chats/:chatId').auth(userToken, {type: 'bearer'});
    expect(res.statusCode).toBe(404);
  });
});

describe('DELETE /chats/:chatId', () => {
  it('should delete user from this chat', async () => {
    const res = await request(app).delete('/chats/:chatId').auth(userToken, {type: 'bearer'});
    expect(res.statusCode).toBe(404);
  });
});
