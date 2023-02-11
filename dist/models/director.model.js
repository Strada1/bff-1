"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Director = exports.directorValidation = void 0;
const express_validator_1 = require("express-validator");
const db_1 = require("../ext/db");
const helpers_1 = require("../shared/helpers");
const DirectorSchema = new db_1.db.Schema({
    firstName: { type: 'String', required: true },
    lastName: { type: 'String', required: true },
    __v: { type: Number, select: false },
}, { timestamps: true });
const validLengths = {
    firstName: { min: 2, max: 15 },
    lastName: { min: 2, max: 15 },
};
exports.directorValidation = [
    (0, express_validator_1.body)('firstName')
        .optional()
        .trim()
        .isLength(validLengths.firstName)
        .withMessage((0, helpers_1.createLengthErrorMessage)('firstName', validLengths.firstName))
        .escape(),
    (0, express_validator_1.body)('lastName')
        .optional()
        .trim()
        .isLength(validLengths.lastName)
        .withMessage((0, helpers_1.createLengthErrorMessage)('lastName', validLengths.lastName))
        .escape(),
];
exports.Director = db_1.db.model('Director', DirectorSchema);
