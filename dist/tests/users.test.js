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
const server_1 = require("../server");
const movies_service_1 = require("../services/movies.service");
const movieMock = __importStar(require("./fixtures/movies.fixture"));
const users_service_1 = require("../services/users.service");
const const_1 = require("../shared/const");
const users_model_1 = require("../models/users.model");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield users_model_1.User.collection.drop();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield users_model_1.User.collection.drop();
}));
describe('POST /users/me/favorites', () => {
    describe('Add to favorites', () => {
        it(`should return a ${http_status_1.default.OK}`, () => __awaiter(void 0, void 0, void 0, function* () {
            const createdMovie = yield (0, movies_service_1.createMovie)(movieMock.movie);
            const { token } = yield (0, users_service_1.createUser)({
                email: 'test@test.ru',
                username: 'username',
                password: 'x32101',
                roles: [const_1.ROLES.USER],
            });
            yield (0, supertest_1.default)(server_1.app)
                .post('/users/me/favorites')
                .set('Authorization', `Bearer ${token}`) // Works.
                .send({ movieId: createdMovie._id })
                .expect(http_status_1.default.OK);
        }));
    });
    describe('Remove from favorites', () => {
        it(`should return a ${http_status_1.default.OK}`, () => __awaiter(void 0, void 0, void 0, function* () {
            const createdMovie = yield (0, movies_service_1.createMovie)(movieMock.movie);
            const { token } = yield (0, users_service_1.createUser)({
                email: 'test@test.ru',
                username: 'username',
                password: 'x32101',
                roles: [const_1.ROLES.USER],
            });
            yield (0, supertest_1.default)(server_1.app)
                .post('/users/me/favorites')
                .set('Authorization', `Bearer ${token}`) // Works.
                .send({ movieId: createdMovie._id });
            yield (0, supertest_1.default)(server_1.app)
                .delete('/users/me/favorites')
                .set('Authorization', `Bearer ${token}`) // Works.
                .send({ movieId: createdMovie._id })
                .expect(http_status_1.default.OK);
        }));
    });
});
