"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userValidation = void 0;
const express_validator_1 = require("express-validator");
const db_1 = require("../ext/db");
const helpers_1 = require("../shared/helpers");
const UserSchema = new db_1.db.Schema({
    email: { type: 'String', required: true },
    username: { type: 'String', required: true },
    password: { type: 'String', required: true },
    token: { type: 'String', required: true },
    roles: [String],
    chats: [{ type: 'ObjectId', ref: 'Chat' }],
    __v: { type: Number, select: false },
}, { timestamps: true });
const validLengths = {
    email: { min: 2, max: 35 },
    username: { min: 1, max: 15 },
    password: { min: 6, max: 15 },
};
exports.userValidation = [
    (0, express_validator_1.body)('email')
        .optional()
        .trim()
        .isLength(validLengths.email)
        .withMessage((0, helpers_1.createLengthErrorMessage)('email', validLengths.email))
        .isEmail(),
    (0, express_validator_1.body)('username')
        .optional()
        .trim()
        .isLength(validLengths.username)
        .withMessage((0, helpers_1.createLengthErrorMessage)('username', validLengths.username))
        .escape(),
    (0, express_validator_1.body)('password')
        .optional()
        .trim()
        .isLength(validLengths.password)
        .withMessage((0, helpers_1.createLengthErrorMessage)('password', validLengths.password))
        .escape(),
    (0, express_validator_1.body)('token').optional().trim().isJWT(),
];
exports.User = db_1.db.model('User', UserSchema);
