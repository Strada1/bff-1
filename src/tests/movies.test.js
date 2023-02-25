const request = require('supertest');
const app = require('../server/server');
const { userAuthOptions, adminAuthOptions } = require("./fixtures/auth");
const { movie, movieWithError, movie2Test } = require("./fixtures/movie");

jest.spyOn(console, 'log').mockImplementation(() => null);

describe('/movies', () => {

  it('POST MOVIE', async () => {

    const { body } = await request(app)
      .post('/movies')
      .set(userAuthOptions.key, userAuthOptions.value)
      .send(movie)
      .expect(201);
    expect(body.title).toEqual(movie.title);
  })

  it('ERROR VALIDATION MOVIE', async () => {

    const { body } = await request(app)
      .post('/movies')
      .set(userAuthOptions.key, userAuthOptions.value)
      .send(movieWithError)
      .expect(201);
    expect(body.title).toEqual(movie.title);
  })

  it('GET MOVIES BY FILTER 1994', async () => {

    const { body } = await request(app)
      .get('/movies?year=1994')
      .set(userAuthOptions.key, userAuthOptions.value)
      .expect(200);
    expect(body).toEqual(body);
    expect(body[0].year).toEqual(1994);
  })

  it('CHANGE MOVIE', async () => {

    const { body } = await request(app)
      .put('/movies/63f70fdd7fc3bc4bd3ca656c')
      .set(adminAuthOptions.key, adminAuthOptions.value)
      .send({ title: 'update test' })
      .expect(201);
    expect(body.title).toEqual('update test');

    await request(app)
      .put('/movies/63f70fdd7fc3bc4bd3ca656c')
      .set(adminAuthOptions.key, adminAuthOptions.value)
      .send(movie2Test)
      .then((res) => {
        expect(res.status).toBe(201);
      })
  })

  it('DELETE MOVIE BY ID (ERROR)', async () => {

    await request(app)
      .delete('/movies/63f71162742e4e3fcce812bd')
      .expect(401);
  })

  it('ADD MOVIE TO FAVORITES', async () => {
    await request(app)
      .patch('/movies/63f1cd40cb8e92c256e5ec5b/add_favorite')
      .set(userAuthOptions.key, userAuthOptions.value)
      .expect(201);
  });

  afterAll((done) => {
    app.close();
    done();
  });

});