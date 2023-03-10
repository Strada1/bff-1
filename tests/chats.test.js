const {describe, expect, it} = require('@jest/globals');
const request = require('supertest');
const app = require('../app');

const userToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEiLCJwYXNzd29yZCI6IjEiLCJpYXQiOjE2NzY5NzExMDF9.CG1cxGmv5bDKzxi_cOvJ3YcjvaiOVhzHRE_E4pzTmlA';
const chatId = '';
const chat = {};

describe('GET /chats', () => {
  it('should return chats', async () => {
    const res = await request(app).get('/chats').auth(userToken, {type: 'bearer'});
    expect(res.statusCode).toBe(200);
  });
});
describe('POST /chats', () => {
  it('should create chat', async () => {
    const res = await request(app).post('/chats').auth(userToken, {type: 'bearer'}).send(chat);
    expect(res.statusCode).toBe(200);
  });
});
describe('UPDATE /chats/:chatId', () => {
  it('should update chat', async () => {
    const res = await request(app).get(`/chats/${chatId}`).auth(userToken, {type: 'bearer'}).send(chat);
    expect(res.statusCode).toBe(200);
  });
});
describe('DELETE /chats', () => {
  it('should delete chat', async () => {
    const res = await request(app).delete(`/chats/${chatId}`).auth(userToken, {type: 'bearer'});
    expect(res.statusCode).toBe(200);
  });
});
