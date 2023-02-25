// @ts-nocheck
import request from 'supertest';
import passport from 'passport';
import STATUS from 'http-status';
import { jest } from '@jest/globals';
import { Movie } from '../models/movies.model';
import { mockStrategy } from '../middlewares/passportStrategies';
import { app } from '../server';
import { createMovie } from '../services/movies.service';
import * as movieMock from './fixtures/movies.fixture';
import { ROLES } from '../shared/const';

beforeAll(async () => {
  await Movie.deleteMany({});
});

afterAll(async () => {
  await Movie.deleteMany({});
});

jest.spyOn(console, 'log').mockImplementation(() => undefined);

describe('GET /movies/:movieId', () => {
  describe('given the movie does not exist', () => {
    it(`should return a ${STATUS.NOT_FOUND}`, async () => {
      await request(app)
        .get(`/movies/${movieMock.wrongMovieId}`)
        .expect(STATUS.NOT_FOUND);
    });
  });

  describe('given the movie does exist', () => {
    it(`should return a ${STATUS.OK} and the movie`, async () => {
      const createdMovie = await createMovie(movieMock.movie);

      await request(app).get(`/movies/${createdMovie._id}`).expect(STATUS.OK);
    });
  });
});

describe('POST /movies', () => {
  describe('request with a wrong role', () => {
    it(`should return a ${STATUS.UNAUTHORIZED}`, async () => {
      passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));

      await request(app)
        .post('/movies')
        .send(movieMock.movie)
        .expect(STATUS.UNAUTHORIZED);
    });
  });

  describe('request with a valid role', () => {
    it(`should return a ${STATUS.CREATED} and the movie`, async () => {
      passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));

      const { body } = await request(app)
        .post('/movies')
        .send(movieMock.movie)
        .expect(STATUS.CREATED);

      expect(body.title).toEqual(movieMock.movie.title);
      expect(body.year).toEqual(movieMock.movie.year);
      expect(body.duration).toEqual(movieMock.movie.duration);
      expect(body.category).toEqual(movieMock.movie.category);
      expect(body.director).toEqual(movieMock.movie.director);
      expect(body.description).toEqual(movieMock.movie.description);
    });
  });

  describe('request with a valid role but wrong payload', () => {
    it(`should return a ${STATUS.BAD_REQUEST}`, async () => {
      passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));

      await request(app)
        .post('/movies')
        .send(movieMock.invalidMovie)
        .expect(STATUS.BAD_REQUEST);
    });
  });
});

describe('PUT /movies/:movieId', () => {
  describe('given the movie does not exist', () => {
    it(`should return a ${STATUS.NOT_FOUND}`, async () => {
      passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));

      const newData = {
        title: 'edited!',
        year: 4321,
        duration: 123,
      };

      await request(app)
        .put(`/movies/${movieMock.wrongMovieId}`)
        .send(newData)
        .expect(STATUS.NOT_FOUND);
    });
  });

  describe('given the movie does exist', () => {
    describe('request with a wrong role', () => {
      it(`should return a ${STATUS.UNAUTHORIZED}`, async () => {
        passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));

        const newData = {
          title: 'edited!',
          year: 4321,
          duration: 123,
        };

        const createdMovie = await createMovie(movieMock.movie);

        await request(app)
          .put(`/movies/${createdMovie._id}`)
          .send(newData)
          .expect(STATUS.UNAUTHORIZED);
      });
    });

    describe('request with a valid role', () => {
      it(`should return a ${STATUS.OK} and the movie`, async () => {
        passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));

        const newData = {
          title: 'edited!',
          year: 4321,
          duration: 123,
        };

        const createdMovie = await createMovie(movieMock.movie);

        const { body } = await request(app)
          .put(`/movies/${createdMovie._id}`)
          .send(newData)
          .expect(STATUS.OK);
        expect(body.title).toEqual(newData.title);
        expect(body.year).toEqual(newData.year);
        expect(body.duration).toEqual(newData.duration);
      });
    });

    describe('request with a valid role but wrong payload', () => {
      it(`should return a ${STATUS.BAD_REQUEST}`, async () => {
        passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));

        const createdMovie = await createMovie(movieMock.movie);

        await request(app)
          .put(`/movies/${createdMovie._id}`)
          .send(movieMock.invalidMovie)
          .expect(STATUS.BAD_REQUEST);
      });
    });
  });
});

describe('DELETE /movies/:movieId', () => {
  describe('given the movie does not exist', () => {
    it(`should return a ${STATUS.NOT_FOUND}`, async () => {
      passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));

      await request(app)
        .delete(`/movies/${movieMock.wrongMovieId}`)
        .expect(STATUS.NOT_FOUND);
    });
  });

  describe('given the movie does exist', () => {
    describe('request with a wrong role', () => {
      it(`should return a ${STATUS.UNAUTHORIZED}`, async () => {
        passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));

        const createdMovie = await createMovie(movieMock.movie);

        await request(app)
          .delete(`/movies/${createdMovie._id}`)
          .expect(STATUS.UNAUTHORIZED);
      });
    });

    describe('request with a valid role', () => {
      it(`should return a ${STATUS.NO_CONTENT}`, async () => {
        passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));

        const createdMovie = await createMovie(movieMock.movie);

        await request(app)
          .delete(`/movies/${createdMovie._id}`)
          .expect(STATUS.NO_CONTENT);
      });
    });
  });
});
