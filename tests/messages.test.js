const {describe, expect, it} = require('@jest/globals');
const request = require('supertest');
const app = require('../app');

const userToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEiLCJwYXNzd29yZCI6IjEiLCJpYXQiOjE2NzY5NzExMDF9.CG1cxGmv5bDKzxi_cOvJ3YcjvaiOVhzHRE_E4pzTmlA';

describe('GET /movies', () => {
  it('should return all movies', async () => {
    const res = await request(app).get('/movies').auth(userToken, {type: 'bearer'});
    expect(res.statusCode).toBe(200);
  });
});

describe('POST /movies', () => {
  it('should be add new movie', async () => {
    const movie = {
      title: 'Гарри Поттер',
      category: '63d95c89ae0fb24823b5b237',
      year: 2022,
      duration: 120,
      director: '63e5316d70801cccb0ac756b',
    };
    const res = await request(app).post('/movies').send(movie).auth(userToken, {type: 'bearer'});
    expect(res.statusCode).toBe(201);
  });
});

describe('POST /movies', () => {
  it('should be return status code 422', async () => {
    const movie = {
      category: '63d95c89ae0fb24823b5b237',
      year: 2022,
      duration: 120,
      director: '63e5316d70801cccb0ac756b',
    };
    const res = await request(app).post('/movies').send(movie).auth(userToken, {type: 'bearer'});
    expect(res.statusCode).toBe(422);
  });
});
