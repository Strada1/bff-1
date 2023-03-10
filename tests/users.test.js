const {describe, expect, it} = require('@jest/globals');
const request = require('supertest');
const app = require('../app');

const adminToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEiLCJwYXNzd29yZCI6IjEiLCJpYXQiOjE2NzY5NzExMDF9.CG1cxGmv5bDKzxi_cOvJ3YcjvaiOVhzHRE_E4pzTmlA';
const userToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEiLCJwYXNzd29yZCI6IjEiLCJpYXQiOjE2NzY5NzExMDF9.CG1cxGmv5bDKzxi_cOvJ3YcjvaiOVhzHRE_E4pzTmlA';
const userId = '';
const chatId = '';

describe('GET /users/:userId/', () => {
  it('should return user', async () => {
    const res = await request(app).get(`/users/${userId}/`).auth(userToken, {type: 'bearer'});
    expect(res.statusCode).toBe(404);
  });
});

describe('GET /users/:userId/chats', () => {
  it('should return a list of chats that the user is a member of', async () => {
    const res = await request(app).get(`/users/${userId}/chats`).auth(userToken, {type: 'bearer'});
    expect(res.statusCode).toBe(404);
  });
});

describe('POST /users/:userId/chats/:chatId', () => {
  it('should add user to chat', async () => {
    const res = await request(app).post(`/users/${userId}/chats/${chatId}`).auth(userToken, {type: 'bearer'});
    expect(res.statusCode).toBe(404);
  });
});

describe('DELETE /users/:userId/chats/:chatId', () => {
  it('should delete user from this chat', async () => {
    const res = await request(app).delete(`/users/${userId}/chats/:chatId`).auth(userToken, {type: 'bearer'});
    expect(res.statusCode).toBe(404);
  });
});
