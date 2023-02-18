"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoute = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
// import * as categoriesController from '../controllers/categories.controller';
const validate_1 = require("../middlewares/validate");
const users_model_1 = require("../models/users.model");
const router = (0, express_1.Router)();
exports.categoriesRoute = router;
router
    .route('/')
    .all((0, validate_1.validate)([...users_model_1.userValidation]))
    .post((0, validate_1.validate)([(0, express_validator_1.body)('username').exists(), (0, express_validator_1.body)('password').exists()]));
