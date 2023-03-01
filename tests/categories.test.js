require('dotenv').config();
const {describe, expect, it} = require('@jest/globals');
const request = require('supertest');
const app = require('../app');

describe('GET /categories', () => {
  it('should return all categories', async () => {
    const res = await request(app).get('/categories');
    expect(res.statusCode).toBe(200);
  });
});

describe('POST /categories', () => {
  it('should add new category', async () => {
    const category = {
      title: 'Тестовая категория',
    };
    const {body} = await request(app).post('/categories').send(category).expect(201);
  });
});

describe('DELETE /categories/:categoryId', () => {
  it('should delete category', async () => {
    const categoryId = '63fc644b2fa152a36473cecb';
    const res = await request(app).delete(`/categories/${categoryId}`);
    expect(res.statusCode).toBe(201);
  });
});
