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
const http_status_1 = __importDefault(require("http-status"));
const passport_1 = __importDefault(require("passport"));
const passportStrategies_1 = require("../middlewares/passportStrategies");
const server_1 = require("../server");
const movies_service_1 = require("../services/movies.service");
const movieMock = __importStar(require("./fixtures/movies.fixture"));
const users_service_1 = require("../services/users.service");
const const_1 = require("../shared/const");
const users_model_1 = require("../models/users.model");
const movies_model_1 = require("../models/movies.model");
const users_fixture_1 = require("./fixtures/users.fixture");
const movies_fixture_1 = require("./fixtures/movies.fixture");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield movies_model_1.Movie.deleteMany({});
    yield users_model_1.User.deleteMany({});
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield movies_model_1.Movie.deleteMany({});
    yield users_model_1.User.deleteMany({});
}));
describe('GET /users/favorites-count', () => {
    describe('Request with right role', () => {
        it(`should return a ${http_status_1.default.OK}`, () => __awaiter(void 0, void 0, void 0, function* () {
            passport_1.default.use('bearer', (0, passportStrategies_1.mockStrategy)({ roles: [const_1.ROLES.ADMIN] }));
            const mockUsers = (0, users_fixture_1.generateUsersMock)(10);
            const mockMovies = (0, movies_fixture_1.generateMoviesMock)(10);
            const createdMovies = yield movies_model_1.Movie.insertMany(mockMovies);
            const usersWithFavorites = mockUsers.map((user) => (Object.assign(Object.assign({}, user), { favorites: (0, users_fixture_1.selectRandomMovieIds)(createdMovies) })));
            const expectedResult = (0, users_fixture_1.favoritesCountMock)(usersWithFavorites, createdMovies);
            yield users_model_1.User.insertMany(usersWithFavorites);
            const { body } = yield (0, supertest_1.default)(server_1.app)
                .get('/users/favorites-count')
                .expect(http_status_1.default.OK);
            expect(body).toEqual(expectedResult);
        }));
    });
    describe('Request with wrong role', () => {
        it(`should return a ${http_status_1.default.UNAUTHORIZED}`, () => __awaiter(void 0, void 0, void 0, function* () {
            passport_1.default.use('bearer', (0, passportStrategies_1.mockStrategy)({ roles: [const_1.ROLES.USER] }));
            yield (0, supertest_1.default)(server_1.app)
                .get('/users/favorites-count')
                .expect(http_status_1.default.UNAUTHORIZED);
        }));
    });
});
describe('POST /users/me/favorites', () => {
    describe('Add to favorites', () => {
        it(`should return a ${http_status_1.default.OK}`, () => __awaiter(void 0, void 0, void 0, function* () {
            passport_1.default.use('bearer', passportStrategies_1.tokenStrategy);
            const createdMovie = yield (0, movies_service_1.createMovie)(movieMock.movie);
            const { token } = yield (0, users_service_1.createUser)(users_fixture_1.userTemplate);
            const { body } = yield (0, supertest_1.default)(server_1.app)
                .post('/users/me/favorites')
                .set('Authorization', `Bearer ${token}`)
                .send({ movieId: createdMovie._id })
                .expect(http_status_1.default.OK);
            expect(body.favorites).toEqual(expect.arrayContaining([createdMovie._id.toString()]));
        }));
    });
    describe('Remove from favorites', () => {
        it(`should return a ${http_status_1.default.OK}`, () => __awaiter(void 0, void 0, void 0, function* () {
            passport_1.default.use('bearer', passportStrategies_1.tokenStrategy);
            const createdMovie = yield (0, movies_service_1.createMovie)(movieMock.movie);
            const { token } = yield (0, users_service_1.createUser)(users_fixture_1.userTemplate);
            yield (0, supertest_1.default)(server_1.app)
                .post('/users/me/favorites')
                .set('Authorization', `Bearer ${token}`)
                .send({ movieId: createdMovie._id });
            const { body } = yield (0, supertest_1.default)(server_1.app)
                .delete('/users/me/favorites')
                .set('Authorization', `Bearer ${token}`)
                .send({ movieId: createdMovie._id })
                .expect(http_status_1.default.OK);
            expect(body.favorites).not.toEqual(expect.arrayContaining([createdMovie._id.toString()]));
        }));
    });
});
