"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const supertest_1 = __importDefault(require("supertest"));
const passport_mock_strategy_1 = require("passport-mock-strategy");
const passport_1 = __importDefault(require("passport"));
const globals_1 = require("@jest/globals");
const movies_model_1 = require("../models/movies.model");
const server_1 = require("../server");
const movies_service_1 = require("../services/movies.service");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield movies_model_1.Movie.collection.drop();
}));
const movie = {
    title: 'kek2!',
    year: 1234,
    duration: 200,
    category: '63e382d1848d4c8af8847773',
    director: '63de2aa638e756a3922dfc0b',
    description: 'test',
};
globals_1.jest
    .spyOn(passport_1.default, 'authenticate')
    .mockImplementation(() => (req, res, next) => {
    next();
});
describe('GET /movies/:movieId', () => {
    describe('given the movie does not exist', () => {
        it('should return a 404', () => __awaiter(void 0, void 0, void 0, function* () {
            const movieId = '63e382d1848d4c8af8847773';
            yield (0, supertest_1.default)(server_1.app).get(`/movies/${movieId}`).expect(404);
        }));
    });
    describe('given the movie does exist', () => {
        it('should return a 200 and the movie', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdMovie = yield (0, movies_service_1.createMovie)(movie);
            yield (0, supertest_1.default)(server_1.app).get(`/movies/${createdMovie._id}`).expect(200);
        }));
    });
});
describe('POST /movies', () => {
    describe('given wrong payload', () => {
        it('should return a 400', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(server_1.app)
                .post('/movies')
                .send(Object.assign(Object.assign({}, movie), { title: 0 }))
                .expect(400);
        }));
    });
    describe('given right payload', () => {
        it('should return a 201 and the movie', () => __awaiter(void 0, void 0, void 0, function* () {
            passport_1.default.unuse('bearer');
            passport_1.default.use('bearer', new passport_mock_strategy_1.MockStrategy());
            const { body } = yield (0, supertest_1.default)(server_1.app)
                .post('/movies')
                .send(movie)
                .expect(201);
            expect(body.title).toEqual(movie.title);
            expect(body.year).toEqual(movie.year);
            expect(body.duration).toEqual(movie.duration);
            expect(body.category).toEqual(movie.category);
            expect(body.director).toEqual(movie.director);
            expect(body.description).toEqual(movie.description);
        }));
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
