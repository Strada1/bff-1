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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoritesCountMock = exports.selectRandomMovieIds = exports.generateUsersMock = exports.userTemplate = void 0;
const lodash_1 = __importDefault(require("lodash"));
const const_1 = require("../../shared/const");
const tokenService = __importStar(require("../../services/token.service"));
const helpers_1 = require("../../shared/helpers");
exports.userTemplate = {
    email: 'lorem@ipsum.dev',
    username: 'dolor',
    password: 'sit amet',
};
function generateUsersMock(count) {
    const result = [];
    for (let i = 0; i < count; i += 1) {
        const token = tokenService.createToken(exports.userTemplate.email + i);
        result.push(Object.assign(Object.assign({}, exports.userTemplate), { email: exports.userTemplate.email + i, username: exports.userTemplate.username + i, password: exports.userTemplate.password + i, roles: [const_1.ROLES.USER], token }));
    }
    return result;
}
exports.generateUsersMock = generateUsersMock;
function selectRandomMovieIds(movies) {
    return movies
        .slice(0, (0, helpers_1.getRandomInt)(movies.length))
        .map((item) => item._id.toString());
}
exports.selectRandomMovieIds = selectRandomMovieIds;
function favoritesCountMock(users, movies) {
    const allFavorites = users.flatMap((user) => [
        ...user.favorites.map((movieId) => movies.find((movie) => movie._id.toString() === movieId)),
    ]);
    const grouped = (0, lodash_1.default)(allFavorites)
        .groupBy((x) => x.title)
        .value();
    return Object.keys(grouped).reduce((accum, key) => (Object.assign(Object.assign({}, accum), { [key]: grouped[key].length })), {});
}
exports.favoritesCountMock = favoritesCountMock;
