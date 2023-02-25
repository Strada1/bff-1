"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const passport_1 = __importDefault(require("passport"));
const http_status_1 = __importDefault(require("http-status"));
const globals_1 = require("@jest/globals");
const movies_model_1 = require("../models/movies.model");
const passportStrategies_1 = require("../middlewares/passportStrategies");
const server_1 = require("../server");
const movies_service_1 = require("../services/movies.service");
const movieMock = __importStar(require("./fixtures/movies.fixture"));
const const_1 = require("../shared/const");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield movies_model_1.Movie.deleteMany({});
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield movies_model_1.Movie.deleteMany({});
}));
globals_1.jest.spyOn(console, 'log').mockImplementation(() => undefined);
describe('GET /movies/:movieId', () => {
    describe('given the movie does not exist', () => {
        it(`should return a ${http_status_1.default.NOT_FOUND}`, () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(server_1.app)
                .get(`/movies/${movieMock.wrongMovieId}`)
                .expect(http_status_1.default.NOT_FOUND);
        }));
    });
    describe('given the movie does exist', () => {
        it(`should return a ${http_status_1.default.OK} and the movie`, () => __awaiter(void 0, void 0, void 0, function* () {
            const createdMovie = yield (0, movies_service_1.createMovie)(movieMock.movie);
            yield (0, supertest_1.default)(server_1.app).get(`/movies/${createdMovie._id}`).expect(http_status_1.default.OK);
        }));
    });
});
describe('POST /movies', () => {
    describe('request with a wrong role', () => {
        it(`should return a ${http_status_1.default.UNAUTHORIZED}`, () => __awaiter(void 0, void 0, void 0, function* () {
            passport_1.default.use('bearer', (0, passportStrategies_1.mockStrategy)({ roles: [const_1.ROLES.USER] }));
            yield (0, supertest_1.default)(server_1.app)
                .post('/movies')
                .send(movieMock.movie)
                .expect(http_status_1.default.UNAUTHORIZED);
        }));
    });
    describe('request with a valid role', () => {
        it(`should return a ${http_status_1.default.CREATED} and the movie`, () => __awaiter(void 0, void 0, void 0, function* () {
            passport_1.default.use('bearer', (0, passportStrategies_1.mockStrategy)({ roles: [const_1.ROLES.ADMIN] }));
            const { body } = yield (0, supertest_1.default)(server_1.app)
                .post('/movies')
                .send(movieMock.movie)
                .expect(http_status_1.default.CREATED);
            expect(body.title).toEqual(movieMock.movie.title);
            expect(body.year).toEqual(movieMock.movie.year);
            expect(body.duration).toEqual(movieMock.movie.duration);
            expect(body.category).toEqual(movieMock.movie.category);
            expect(body.director).toEqual(movieMock.movie.director);
            expect(body.description).toEqual(movieMock.movie.description);
        }));
    });
    describe('request with a valid role but wrong payload', () => {
        it(`should return a ${http_status_1.default.BAD_REQUEST}`, () => __awaiter(void 0, void 0, void 0, function* () {
            passport_1.default.use('bearer', (0, passportStrategies_1.mockStrategy)({ roles: [const_1.ROLES.ADMIN] }));
            yield (0, supertest_1.default)(server_1.app)
                .post('/movies')
                .send(movieMock.invalidMovie)
                .expect(http_status_1.default.BAD_REQUEST);
        }));
    });
});
describe('PUT /movies/:movieId', () => {
    describe('given the movie does not exist', () => {
        it(`should return a ${http_status_1.default.NOT_FOUND}`, () => __awaiter(void 0, void 0, void 0, function* () {
            passport_1.default.use('bearer', (0, passportStrategies_1.mockStrategy)({ roles: [const_1.ROLES.ADMIN] }));
            const newData = {
                title: 'edited!',
                year: 4321,
                duration: 123,
            };
            yield (0, supertest_1.default)(server_1.app)
                .put(`/movies/${movieMock.wrongMovieId}`)
                .send(newData)
                .expect(http_status_1.default.NOT_FOUND);
        }));
    });
    describe('given the movie does exist', () => {
        describe('request with a wrong role', () => {
            it(`should return a ${http_status_1.default.UNAUTHORIZED}`, () => __awaiter(void 0, void 0, void 0, function* () {
                passport_1.default.use('bearer', (0, passportStrategies_1.mockStrategy)({ roles: [const_1.ROLES.USER] }));
                const newData = {
                    title: 'edited!',
                    year: 4321,
                    duration: 123,
                };
                const createdMovie = yield (0, movies_service_1.createMovie)(movieMock.movie);
                yield (0, supertest_1.default)(server_1.app)
                    .put(`/movies/${createdMovie._id}`)
                    .send(newData)
                    .expect(http_status_1.default.UNAUTHORIZED);
            }));
        });
        describe('request with a valid role', () => {
            it(`should return a ${http_status_1.default.OK} and the movie`, () => __awaiter(void 0, void 0, void 0, function* () {
                passport_1.default.use('bearer', (0, passportStrategies_1.mockStrategy)({ roles: [const_1.ROLES.ADMIN] }));
                const newData = {
                    title: 'edited!',
                    year: 4321,
                    duration: 123,
                };
                const createdMovie = yield (0, movies_service_1.createMovie)(movieMock.movie);
                const { body } = yield (0, supertest_1.default)(server_1.app)
                    .put(`/movies/${createdMovie._id}`)
                    .send(newData)
                    .expect(http_status_1.default.OK);
                expect(body.title).toEqual(newData.title);
                expect(body.year).toEqual(newData.year);
                expect(body.duration).toEqual(newData.duration);
            }));
        });
        describe('request with a valid role but wrong payload', () => {
            it(`should return a ${http_status_1.default.BAD_REQUEST}`, () => __awaiter(void 0, void 0, void 0, function* () {
                passport_1.default.use('bearer', (0, passportStrategies_1.mockStrategy)({ roles: [const_1.ROLES.ADMIN] }));
                const createdMovie = yield (0, movies_service_1.createMovie)(movieMock.movie);
                yield (0, supertest_1.default)(server_1.app)
                    .put(`/movies/${createdMovie._id}`)
                    .send(movieMock.invalidMovie)
                    .expect(http_status_1.default.BAD_REQUEST);
            }));
        });
    });
});
describe('DELETE /movies/:movieId', () => {
    describe('given the movie does not exist', () => {
        it(`should return a ${http_status_1.default.NOT_FOUND}`, () => __awaiter(void 0, void 0, void 0, function* () {
            passport_1.default.use('bearer', (0, passportStrategies_1.mockStrategy)({ roles: [const_1.ROLES.ADMIN] }));
            yield (0, supertest_1.default)(server_1.app)
                .delete(`/movies/${movieMock.wrongMovieId}`)
                .expect(http_status_1.default.NOT_FOUND);
        }));
    });
    describe('given the movie does exist', () => {
        describe('request with a wrong role', () => {
            it(`should return a ${http_status_1.default.UNAUTHORIZED}`, () => __awaiter(void 0, void 0, void 0, function* () {
                passport_1.default.use('bearer', (0, passportStrategies_1.mockStrategy)({ roles: [const_1.ROLES.USER] }));
                const createdMovie = yield (0, movies_service_1.createMovie)(movieMock.movie);
                yield (0, supertest_1.default)(server_1.app)
                    .delete(`/movies/${createdMovie._id}`)
                    .expect(http_status_1.default.UNAUTHORIZED);
            }));
        });
        describe('request with a valid role', () => {
            it(`should return a ${http_status_1.default.NO_CONTENT}`, () => __awaiter(void 0, void 0, void 0, function* () {
                passport_1.default.use('bearer', (0, passportStrategies_1.mockStrategy)({ roles: [const_1.ROLES.ADMIN] }));
                const createdMovie = yield (0, movies_service_1.createMovie)(movieMock.movie);
                yield (0, supertest_1.default)(server_1.app)
                    .delete(`/movies/${createdMovie._id}`)
                    .expect(http_status_1.default.NO_CONTENT);
            }));
        });
    });
});
