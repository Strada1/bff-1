// @ts-nocheck
import request from 'supertest';
import STATUS from 'http-status';
import passport from 'passport';
import { mockStrategy, tokenStrategy } from '../middlewares/passportStrategies';
import { app } from '../server';
import { createMovie } from '../services/movies.service';
import * as movieMock from './fixtures/movies.fixture';
import { createUser } from '../services/users.service';
import { ROLES } from '../shared/const';
import { User } from '../models/users.model';
import { Movie } from '../models/movies.model';
import {
  generateUsersMock,
  userTemplate,
  selectRandomMovieIds,
  favoritesCountMock,
} from './fixtures/users.fixture';
import { generateMoviesMock } from './fixtures/movies.fixture';

beforeAll(async () => {
  await Movie.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  await Movie.deleteMany({});
  await User.deleteMany({});
});

describe('GET /users/favorites-count', () => {
  describe('Request with right role', () => {
    it(`should return a ${STATUS.OK}`, async () => {
      passport.unuse('bearer');
      passport.use('bearer', mockStrategy({ roles: [ROLES.ADMIN] }));

      const mockUsers = generateUsersMock(10);
      const mockMovies = generateMoviesMock(10);
      const createdMovies = await Movie.insertMany(mockMovies);
      const usersWithFavorites = mockUsers.map((user) => ({
        ...user,
        favorites: selectRandomMovieIds(createdMovies),
      }));
      const expectedResult = favoritesCountMock(
        usersWithFavorites,
        createdMovies
      );

      await User.insertMany(usersWithFavorites);
      const { body } = await request(app)
        .get('/users/favorites-count')
        .expect(STATUS.OK);
      expect(body).toEqual(expectedResult);
    });
  });

  describe('Request with wrong role', () => {
    it(`should return a ${STATUS.UNAUTHORIZED}`, async () => {
      passport.unuse('bearer');
      passport.use('bearer', mockStrategy({ roles: [ROLES.USER] }));

      await request(app)
        .get('/users/favorites-count')
        .expect(STATUS.UNAUTHORIZED);
    });
  });
});

describe('POST /users/me/favorites', () => {
  describe('Add to favorites', () => {
    it(`should return a ${STATUS.OK}`, async () => {
      passport.unuse('bearer');
      passport.use('bearer', tokenStrategy);

      const createdMovie = await createMovie(movieMock.movie);
      const { token } = await createUser(userTemplate);
      const { body } = await request(app)
        .post('/users/me/favorites')
        .set('Authorization', `Bearer ${token}`)
        .send({ movieId: createdMovie._id })
        .expect(STATUS.OK);

      expect(body.favorites).toEqual(
        expect.arrayContaining([createdMovie._id.toString()])
      );
    });
  });

  describe('Remove from favorites', () => {
    it(`should return a ${STATUS.OK}`, async () => {
      passport.unuse('bearer');
      passport.use('bearer', tokenStrategy);

      const createdMovie = await createMovie(movieMock.movie);
      const { token } = await createUser(userTemplate);

      await request(app)
        .post('/users/me/favorites')
        .set('Authorization', `Bearer ${token}`)
        .send({ movieId: createdMovie._id });

      const { body } = await request(app)
        .delete('/users/me/favorites')
        .set('Authorization', `Bearer ${token}`)
        .send({ movieId: createdMovie._id })
        .expect(STATUS.OK);

      expect(body.favorites).not.toEqual(
        expect.arrayContaining([createdMovie._id.toString()])
      );
    });
  });
});
