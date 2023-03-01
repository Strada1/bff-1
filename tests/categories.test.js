const {describe, expect, it} = require('@jest/globals');
const request = require('supertest');
const app = require('../app');

const adminToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEiLCJwYXNzd29yZCI6IjEiLCJpYXQiOjE2NzY5NzExMDF9.CG1cxGmv5bDKzxi_cOvJ3YcjvaiOVhzHRE_E4pzTmlA';

describe('GET /categories', () => {
  it('should return all categories', async () => {
    const res = await request(app)
      .get('/categories')
      .auth(adminToken, {type: 'bearer'})
      .set('Authorization', 'bearer ' + adminToken);
    expect(res.statusCode).toBe(200);
  });
});

describe('POST /categories', () => {
  it('should add new category', async () => {
    const category = {
      title: 'Тестовая категория',
    };
    const {body} = await request(app)
      .post('/categories')
      .auth(adminToken, {type: 'bearer'})
      .send(category)
      .set('Authorization', 'bearer ' + adminToken)
      .expect(201);
  });
});

describe('DELETE /categories/:categoryId', () => {
  it('should delete category', async () => {
    const categoryId = '63fc644b2fa152a36473cecb';
    const res = await request(app)
      .delete(`/categories/${categoryId}`)
      .auth(adminToken, {type: 'bearer'})
      .set('Authorization', 'bearer ' + adminToken);
    expect(res.statusCode).toBe(201);
  });
});
