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
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoute = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const authorization_1 = require("../middlewares/authorization");
const usersController = __importStar(require("../controllers/users.controller"));
const validate_1 = require("../middlewares/validate");
const users_model_1 = require("../models/users.model");
const const_1 = require("../shared/const");
const authenticate_1 = require("../middlewares/authenticate");
const router = (0, express_1.Router)();
exports.usersRoute = router;
router
    .route('/')
    .all((0, validate_1.validate)([...users_model_1.userValidation]))
    .get(usersController.getUsers)
    .post((0, validate_1.validate)([(0, express_validator_1.body)('email').exists(), (0, express_validator_1.body)('username').exists()]), usersController.createUser);
router
    .route('/auth')
    .all((0, validate_1.validate)([...users_model_1.userValidation]))
    .post((0, validate_1.validate)([(0, express_validator_1.body)('email').exists(), (0, express_validator_1.body)('password').exists()]), usersController.authUser);
router
    .route('/me')
    .all((0, authenticate_1.authentication)(), (0, validate_1.validate)([...users_model_1.userValidation]))
    .get(usersController.getUserInfo)
    .put(usersController.updateUserInfo);
router
    .route('/me/favorites')
    .all((0, authenticate_1.authentication)(), (0, validate_1.validate)([...users_model_1.userValidation]))
    .post(usersController.addMovieToFavorites)
    .delete(usersController.removeMovieFromFavorites);
router
    .route('/favorites-count')
    .all((0, authenticate_1.authentication)(), (0, authorization_1.authorization)([const_1.ROLES.ADMIN]), (0, validate_1.validate)([...users_model_1.userValidation]))
    .get(usersController.getFavoritesCount);
router
    .route('/:userId')
    .all((0, express_validator_1.param)('userId').isMongoId(), (0, validate_1.validate)([...users_model_1.userValidation]))
    .get(usersController.getUser)
    .put((0, authenticate_1.authentication)(), (0, authorization_1.authorization)([const_1.ROLES.ADMIN]), usersController.updateUser)
    .delete((0, authenticate_1.authentication)(), (0, authorization_1.authorization)([const_1.ROLES.ADMIN]), usersController.deleteUser);
router
    .route('/:userId/roles')
    .all((0, express_validator_1.param)('userId').isMongoId(), (0, validate_1.validate)([...users_model_1.userValidation]))
    .get(usersController.getUserRoles)
    .post((0, authenticate_1.authentication)(), (0, authorization_1.authorization)([const_1.ROLES.ADMIN]), usersController.addRoleToUser)
    .delete((0, authenticate_1.authentication)(), (0, authorization_1.authorization)([const_1.ROLES.ADMIN]), usersController.removeRoleFromUser);
