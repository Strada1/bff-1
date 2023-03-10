const {describe, expect, it} = require('@jest/globals');
const request = require('supertest');
const app = require('../app');

const chatId = '640b12ff140b2f56e8212896';
const chat = {
  title: 'My first chat',
  users: [],
};

describe('GET /chats', () => {
  it('should return chats', async () => {
    const res = await request(app).get('/chats');
    expect(res.statusCode).toBe(200);
  });
});
describe('POST /chats', () => {
  it('should create chat', async () => {
    const res = await request(app).post('/chats').send(chat);
    expect(res.statusCode).toBe(201);
  });
});
describe('UPDATE /chats/:chatId', () => {
  it('should update chat', async () => {
    const res = await request(app).put(`/chats/${chatId}`).send(chat);
    expect(res.statusCode).toBe(201);
  });
});
describe('DELETE /chats', () => {
  it('should delete chat', async () => {
    const res = await request(app).delete(`/chats/${chatId}`);
    expect(res.statusCode).toBe(200);
  });
});
