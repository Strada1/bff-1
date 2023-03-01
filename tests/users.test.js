const {describe, expect, it} = require('@jest/globals');
const request = require('supertest');
const app = require('../app');

const adminToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEiLCJwYXNzd29yZCI6IjEiLCJpYXQiOjE2NzY5NzExMDF9.CG1cxGmv5bDKzxi_cOvJ3YcjvaiOVhzHRE_E4pzTmlA';
const userId = '63f48c5d7cbabdb825c10391';
const movieId = '63e0ee2212fc9dfa62b16108';

describe('POST /users/:userId/favoriteMovies', () => {
  it('should add movie in user.favourite', async () => {
    const res = await request(app)
      .post(`/users/${userId}/favoriteMovies`)
      .auth(adminToken, {type: 'bearer'})
      .send({movieId})
      .send({movieId});
    expect(res.statusCode).toBe(201);
  });
});
