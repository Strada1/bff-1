const {describe, expect, it} = require('@jest/globals');
const request = require('supertest');
const app = require('../app');

const adminToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEiLCJwYXNzd29yZCI6IjEiLCJpYXQiOjE2NzY5NzExMDF9.CG1cxGmv5bDKzxi_cOvJ3YcjvaiOVhzHRE_E4pzTmlA';
const userId = '63f78f260e06527fbcf78cfd';
const movieId = '63f0c06b2352063a34f81346';

describe('POST /users/:userId/favoriteMovies', () => {
  it('should add movie in user.favouriteMovies', async () => {
    const res = await request(app)
      .post(`/users/${userId}/favoriteMovies`)
      .auth(adminToken, {type: 'bearer'})
      .send({movieId})
      .send({movieId});
    expect(res.statusCode).toBe(201);
  });
});

describe('DELETE /users/:userId/favoriteMovies', () => {
  it('should delete movie from user.favouriteMovies', async () => {
    const res = await request(app)
      .post(`/users/${userId}/favoriteMovies`)
      .auth(adminToken, {type: 'bearer'})
      .send({movieId})
      .send({movieId});
    expect(res.statusCode).toBe(200);
  });
});
