const {describe, expect, it} = require('@jest/globals');
const request = require('supertest');
const app = require('../app');

const adminToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEiLCJwYXNzd29yZCI6IjEiLCJpYXQiOjE2NzY5NzExMDF9.CG1cxGmv5bDKzxi_cOvJ3YcjvaiOVhzHRE_E4pzTmlA';
const userId = '63f3603595938e4fc3ab17a4';
const movieId = '63e0ee2212fc9dfa62b16108';

describe('GET /users/:userId/favoriteMoviesCount', () => {
  it('should count the number of favorite movies', async () => {
    const res = await request(app)
      .get(`/users/${userId}/favoriteMoviesCount`)
      .auth(adminToken, {type: 'bearer'})
      .query({groupBy: 'title'});
    expect(res.statusCode).toBe(404);
  });
});

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
      .delete(`/users/${userId}/favoriteMovies`)
      .auth(adminToken, {type: 'bearer'})
      .send({userId, movieId});
    expect(res.statusCode).toBe(200);
  });
});
