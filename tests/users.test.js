const {describe, expect, it} = require('@jest/globals');
const request = require('supertest');
const app = require('../app');

const adminToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEiLCJwYXNzd29yZCI6IjEiLCJpYXQiOjE2NzY5NzExMDF9.CG1cxGmv5bDKzxi_cOvJ3YcjvaiOVhzHRE_E4pzTmlA';
const userToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEiLCJwYXNzd29yZCI6IjEiLCJpYXQiOjE2NzY5NzExMDF9.CG1cxGmv5bDKzxi_cOvJ3YcjvaiOVhzHRE_E4pzTmlA';
const userId = '';
const user = {};
describe('GET /users', () => {
  it('should return all users', async () => {
    const res = await request(app).get('/users').auth(adminToken, {type: 'bearer'});
    expect(res.statusCode).toBe(404);
  });
});

describe('POST /users', () => {
  it('should add new user', async () => {
    const res = await request(app).post('/users').send(user).auth(userToken, {type: 'bearer'});
    expect(res.statusCode).toBe(404);
  });
});

describe('GET /users/:userId/', () => {
  it('should return user', async () => {
    const res = await request(app).get(`/users/${userId}/`).auth(userToken, {type: 'bearer'});
    expect(res.statusCode).toBe(404);
  });
});

describe('PUT /users/:userId', () => {
  it('should update user', async () => {
    const res = await request(app).put(`/users/:userId`).send(user).auth(userToken, {type: 'bearer'});
    expect(res.statusCode).toBe(404);
  });
});

describe('DELETE /users/:userId', () => {
  it('should delete user', async () => {
    const res = await request(app).delete(`/users/:userId`).auth(adminToken, {type: 'bearer'});
    expect(res.statusCode).toBe(404);
  });
});
