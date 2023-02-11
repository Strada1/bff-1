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
const movies_model_1 = require("../models/movies.model");
const validations_1 = require("../shared/validations");
const router = (0, express_1.Router)();
exports.moviesRoute = router;
router
    .route('/')
    .all((0, validate_1.validate)([...movies_model_1.movieValidation]))
    .get((0, validate_1.validate)([...validations_1.sortOrderValidation, (0, express_validator_1.query)('year').optional().isNumeric()]), moviesController.getMovies)
    .post((0, validate_1.validate)([(0, express_validator_1.body)('title').exists(), (0, express_validator_1.body)('category').exists()]), moviesController.createMovie);
router
    .route('/:movieId')
    .all((0, validate_1.validate)([(0, express_validator_1.param)('movieId').isMongoId(), ...movies_model_1.movieValidation]))
    .get(moviesController.getMovie)
    .put(moviesController.updateMovie)
    .delete(moviesController.deleteMovie);
router
    .route('/test-aggregation/count-by-director')
    .get(moviesController.aggregateByDirector);
router
    .route('/test-aggregation/count-by-dates')
    .get((0, validate_1.validate)([(0, express_validator_1.query)('from').isNumeric(), (0, express_validator_1.query)('to').isNumeric()]), moviesController.aggregateByDates);
