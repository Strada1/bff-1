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
exports.moviesRoute = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const moviesController = __importStar(require("../controllers/movies.controller"));
const validate_1 = require("../middlewares/validate");
const const_1 = require("../shared/const");
const router = (0, express_1.Router)();
exports.moviesRoute = router;
router
    .route('/')
    .get(moviesController.getMovies)
    .post((0, validate_1.validate)([
    (0, express_validator_1.body)('title').notEmpty(),
    (0, express_validator_1.body)('category').isLength(const_1.OBJECT_ID_LENGTH_RANGE),
    (0, express_validator_1.body)('director').optional().isLength(const_1.OBJECT_ID_LENGTH_RANGE),
]), moviesController.createMovie);
router
    .route('/:movieId')
    .all((0, validate_1.validate)([(0, express_validator_1.param)('movieId').isLength(const_1.OBJECT_ID_LENGTH_RANGE)]))
    .get(moviesController.getMovie)
    .put((0, validate_1.validate)([
    (0, express_validator_1.body)('category').optional().isLength(const_1.OBJECT_ID_LENGTH_RANGE),
    (0, express_validator_1.body)('director').optional().isLength(const_1.OBJECT_ID_LENGTH_RANGE),
]), moviesController.updateMovie)
    .delete(moviesController.deleteMovie);
