// @ts-nocheck
import request from 'supertest';
import { MockStrategy } from 'passport-mock-strategy';
import passport from 'passport';
import { jest } from '@jest/globals';
import { Movie } from '../models/movies.model';
import { app } from '../server';
import { createMovie } from '../services/movies.service';

beforeAll(async () => {
  await Movie.collection.drop();
});

const movie = {
  title: 'kek2!',
  year: 1234,
  duration: 200,
  category: '63e382d1848d4c8af8847773',
  director: '63de2aa638e756a3922dfc0b',
  description: 'test',
};

jest
  .spyOn(passport, 'authenticate')
  .mockImplementation(() => (req, res, next) => {
    next();
  });

describe('GET /movies/:movieId', () => {
  describe('given the movie does not exist', () => {
    it('should return a 404', async () => {
      const movieId = '63e382d1848d4c8af8847773';

      await request(app).get(`/movies/${movieId}`).expect(404);
    });
  });

  describe('given the movie does exist', () => {
    it('should return a 200 and the movie', async () => {
      const createdMovie = await createMovie(movie);

      await request(app).get(`/movies/${createdMovie._id}`).expect(200);
    });
  });
});

describe('POST /movies', () => {
  describe('given wrong payload', () => {
    it('should return a 400', async () => {
      await request(app)
        .post('/movies')
        .send({ ...movie, title: 0 })
        .expect(400);
    });
  });

  describe('given right payload', () => {
    it('should return a 201 and the movie', async () => {
      passport.unuse('bearer');
      passport.use('bearer', new MockStrategy());

      const { body } = await request(app)
        .post('/movies')
        .send(movie)
        .expect(201);

      expect(body.title).toEqual(movie.title);
      expect(body.year).toEqual(movie.year);
      expect(body.duration).toEqual(movie.duration);
      expect(body.category).toEqual(movie.category);
      expect(body.director).toEqual(movie.director);
      expect(body.description).toEqual(movie.description);
    });
  });
});

// describe('update movie route', () => {
//   describe('given the movie does not exist', () => {
//     it('should return a 400', async () => {
//       const newData = {
//         title: 'edited!',
//         year: 4321,
//         duration: 123,
//       };

//       await request(app).put('/movies/42').send(newData).expect(400);
//     });
//   });

//   describe('given the movie does exist', () => {
//     it('should return a 200 and the movie', async () => {
//       const newData = {
//         title: 'edited!',
//         year: 4321,
//         duration: 123,
//       };

//       const createdMovie = await request(app).post('/movies').send(movie);
//       const { body } = await request(app)
//         .put(`/movies/${createdMovie.body._id}`)
//         .send(newData)
//         .expect(200);
//       expect(body.title).toEqual(newData.title);
//       expect(body.year).toEqual(newData.year);
//       expect(body.duration).toEqual(newData.duration);
//     });
//   });

//   describe('given wrong payload', () => {
//     it('should return a 400', async () => {
//       const newData = {
//         title: '0',
//       };

//       const createdMovie = await request(app).post('/movies').send(movie);
//       await request(app)
//         .put(`/movies/${createdMovie.body._id}`)
//         .send(newData)
//         .expect(400);
//     });
//   });
// });

// describe('delete movie route', () => {
//   describe('given the movie does not exist', () => {
//     it('should return a 404', async () => {
//       await request(app).delete('/movies/63e382d1848d4c8af8847773').expect(404);
//     });
//   });

//   describe('given the movie does exist', () => {
//     it('should return a 204', async () => {
//       const createdMovie = await request(app).post('/movies').send(movie);

//       await request(app).delete(`/movies/${createdMovie.body._id}`).expect(204);
//     });
//   });
