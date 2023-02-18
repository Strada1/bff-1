"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = exports.commentValidation = void 0;
const express_validator_1 = require("express-validator");
const db_1 = require("../ext/db");
const helpers_1 = require("../shared/helpers");
const CommentSchema = new db_1.db.Schema({
    user: { type: 'ObjectId', ref: 'User', required: true },
    movie: { type: 'ObjectId', ref: 'Movie', required: true },
    text: { type: 'String', required: true },
    __v: { type: Number, select: false },
}, { timestamps: true });
const validLengths = {
    text: { min: 2, max: 280 },
};
exports.commentValidation = [
    (0, express_validator_1.body)('user').optional().isMongoId(),
    (0, express_validator_1.body)('movie').optional().isMongoId(),
    (0, express_validator_1.body)('text')
        .optional()
        .trim()
        .isLength(validLengths.text)
        .withMessage((0, helpers_1.createLengthErrorMessage)('text', validLengths.text))
        .escape(),
];
exports.Comment = db_1.db.model('Comment', CommentSchema);
