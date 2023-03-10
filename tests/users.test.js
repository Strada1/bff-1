const {describe, expect, it} = require('@jest/globals');
const request = require('supertest');
const app = require('../app');

const adminToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEiLCJwYXNzd29yZCI6IjEiLCJpYXQiOjE2NzY5NzExMDF9.CG1cxGmv5bDKzxi_cOvJ3YcjvaiOVhzHRE_E4pzTmlA';
const userToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEiLCJwYXNzd29yZCI6IjEiLCJpYXQiOjE2NzY5NzExMDF9.CG1cxGmv5bDKzxi_cOvJ3YcjvaiOVhzHRE_E4pzTmlA';

const userId = '640b1677445675d885e968b9';
const chatId = '640b132dfeb3d28652c60575';

describe('GET /users/:userId/', () => {
  it('should return user', async () => {
    const res = await request(app).get(`/users/${userId}/`);
    expect(res.statusCode).toBe(200);
  });
});

describe('GET /users/:userId/chats', () => {
  it('should return a list of chats that the user is a member of', async () => {
    const res = await request(app).get(`/users/${userId}/chats`);
    expect(res.statusCode).toBe(200);
  });
});

describe('POST /users/:userId/chats/:chatId', () => {
  it('should add user to chat', async () => {
    const res = await request(app).post(`/users/${userId}/chats/${chatId}`);
    expect(res.statusCode).toBe(201);
  });
});

describe('DELETE /users/:userId/chats/:chatId', () => {
  it('should delete user from this chat', async () => {
    const res = await request(app).delete(`/users/${userId}/chats/${chatId}`);
    expect(res.statusCode).toBe(200);
  });
});
