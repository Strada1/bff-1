"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = exports.movieValidation = void 0;
const express_validator_1 = require("express-validator");
const db_1 = require("../ext/db");
const helpers_1 = require("../shared/helpers");
const MovieSchema = new db_1.db.Schema({
    title: { type: 'String', required: true },
    category: { type: 'ObjectId', ref: 'Category', required: true },
    year: Number,
    duration: Number,
    description: String,
    director: { type: 'ObjectId', ref: 'Director' },
    comments: [{ type: 'ObjectId', ref: 'Comment' }],
    __v: { type: Number, select: false },
}, { timestamps: true });
const validLengths = {
    title: { min: 2, max: 45 },
    year: { min: 4, max: 4 },
    description: { min: 1, max: 300 },
};
exports.movieValidation = [
    (0, express_validator_1.body)('title')
        .optional()
        .trim()
        .isLength(validLengths.title)
        .withMessage((0, helpers_1.createLengthErrorMessage)('title', validLengths.title))
        .escape(),
    (0, express_validator_1.body)('description')
        .optional()
        .trim()
        .isLength(validLengths.description)
        .withMessage((0, helpers_1.createLengthErrorMessage)('description', validLengths.description))
        .escape(),
    (0, express_validator_1.body)('category').optional().isMongoId(),
    (0, express_validator_1.body)('year')
        .optional()
        .isNumeric()
        .isLength(validLengths.year)
        .withMessage((0, helpers_1.createLengthErrorMessage)('year', validLengths.year)),
    (0, express_validator_1.body)('duration').optional().isNumeric(),
    (0, express_validator_1.body)('director').optional().isMongoId(),
];
exports.Movie = db_1.db.model('Movie', MovieSchema);
