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
exports.deleteUser = exports.authUser = exports.updateUser = exports.updateUserInfo = exports.removeRoleFromUser = exports.addRoleToUser = exports.removeMovieFromFavorites = exports.addMovieToFavorites = exports.createUser = exports.getUserInfo = exports.getUserRoles = exports.getFavoritesCount = exports.getUser = exports.getUsers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const usersService = __importStar(require("../services/users.service"));
const ApiError_1 = __importDefault(require("../shared/ApiError"));
const const_1 = require("../shared/const");
const user_dto_1 = require("../dto/user.dto");
exports.getUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield usersService.getUsers();
    res.status(http_status_1.default.OK).send((0, user_dto_1.getUsersResponseDTO)(users));
}));
exports.getUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const user = yield usersService.getUser(userId);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, const_1.ERROR_TEXT.USERS.USER_NOT_FOUND);
    }
    res.status(http_status_1.default.OK).send((0, user_dto_1.getUserResponseDTO)(user));
}));
exports.getFavoritesCount = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield usersService.aggregateByMovies();
    res.status(http_status_1.default.OK).send(result !== null && result !== void 0 ? result : []);
}));
exports.getUserRoles = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const user = yield usersService.getUser(userId);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, const_1.ERROR_TEXT.USERS.USER_NOT_FOUND);
    }
    res.status(http_status_1.default.OK).send({ roles: user.roles });
}));
exports.getUserInfo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(http_status_1.default.OK).send((0, user_dto_1.getFullUserResponseDTO)(req.user));
}));
exports.createUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    const user = yield usersService.getUserByEmail(email);
    if (user) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, const_1.ERROR_TEXT.USERS.USER_EXIST);
    }
    const createdUser = yield usersService.createUser({
        email,
        username,
        password,
        roles: [const_1.ROLES.USER],
    });
    res.status(http_status_1.default.CREATED).send((0, user_dto_1.getFullUserResponseDTO)(createdUser));
}));
exports.addMovieToFavorites = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const { movieId } = req.body;
    const updatedUser = yield usersService.addMovieToFavorites(_id, movieId);
    if (!updatedUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, const_1.ERROR_TEXT.USERS.USER_NOT_FOUND);
    }
    res.status(http_status_1.default.OK).send((0, user_dto_1.getFullUserResponseDTO)(updatedUser));
}));
exports.removeMovieFromFavorites = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const { movieId } = req.body;
    const updatedUser = yield usersService.removeMovieFromFavorites(_id, movieId);
    if (!updatedUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, const_1.ERROR_TEXT.USERS.USER_NOT_FOUND);
    }
    res.status(http_status_1.default.OK).send((0, user_dto_1.getFullUserResponseDTO)(updatedUser));
}));
exports.addRoleToUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { role } = req.body;
    const isRoleValid = Object.values(const_1.ROLES).includes(role);
    if (!isRoleValid) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, const_1.ERROR_TEXT.USERS.NOT_VALID_ROLE);
    }
    const updatedUser = yield usersService.addRoleToUser(userId, role);
    if (!updatedUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, const_1.ERROR_TEXT.USERS.USER_NOT_FOUND);
    }
    res.status(http_status_1.default.OK).send((0, user_dto_1.getFullUserResponseDTO)(updatedUser));
}));
exports.removeRoleFromUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { role } = req.body;
    const isRoleValid = Object.values(const_1.ROLES).includes(role);
    if (!isRoleValid) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, const_1.ERROR_TEXT.USERS.NOT_VALID_ROLE);
    }
    const updatedUser = yield usersService.removeRoleFromUser(userId, role);
    if (!updatedUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, const_1.ERROR_TEXT.USERS.USER_NOT_FOUND);
    }
    res.status(http_status_1.default.OK).send((0, user_dto_1.getFullUserResponseDTO)(updatedUser));
}));
exports.updateUserInfo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.user;
    const { username, password } = req.body;
    const updatedUser = yield usersService.updateUser(_id, {
        username,
        password,
    });
    if (!updatedUser) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, const_1.ERROR_TEXT.SERVER.INTERNAL_ERROR);
    }
    res.status(http_status_1.default.OK).send((0, user_dto_1.getFullUserResponseDTO)(updatedUser));
}));
exports.updateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const { username, password } = req.body;
    const updatedUser = yield usersService.updateUser(userId, {
        username,
        password,
    });
    if (!updatedUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, const_1.ERROR_TEXT.USERS.USER_NOT_FOUND);
    }
    res.status(http_status_1.default.OK).send((0, user_dto_1.getFullUserResponseDTO)(updatedUser));
}));
exports.authUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { user, isPasswordCorrect } = yield usersService.authUser(email, password);
    if (!user || !isPasswordCorrect) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, const_1.ERROR_TEXT.USERS.WRONG_USER_OR_PASSWORD);
    }
    res.status(http_status_1.default.OK).send((0, user_dto_1.getFullUserResponseDTO)(user));
}));
exports.deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const deletedUser = yield usersService.deleteUser(userId);
    if (!deletedUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, const_1.ERROR_TEXT.USERS.USER_NOT_FOUND);
    }
    res.status(http_status_1.default.NO_CONTENT).send();
}));
