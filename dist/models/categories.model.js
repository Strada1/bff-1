"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = exports.categoryValidation = void 0;
const express_validator_1 = require("express-validator");
const db_1 = require("../ext/db");
const helpers_1 = require("../shared/helpers");
const CategorySchema = new db_1.db.Schema({
    title: { type: 'String', required: true },
    __v: { type: Number, select: false },
}, { timestamps: true });
const validLengths = {
    title: { min: 2, max: 15 },
};
exports.categoryValidation = [
    (0, express_validator_1.body)('title')
        .optional()
        .trim()
        .isLength(validLengths.title)
        .withMessage((0, helpers_1.createLengthErrorMessage)('title', validLengths.title))
        .escape(),
];
exports.Category = db_1.db.model('Category', CategorySchema);
