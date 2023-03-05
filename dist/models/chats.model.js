"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = exports.chatValidation = void 0;
const express_validator_1 = require("express-validator");
const db_1 = require("../ext/db");
const helpers_1 = require("../shared/helpers");
const ChatSchema = new db_1.db.Schema({
    title: { type: 'String', required: true },
    users: [{ type: 'ObjectId', ref: 'User' }],
    __v: { type: Number, select: false },
}, { timestamps: true });
const validLengths = {
    title: { min: 2, max: 15 },
};
exports.chatValidation = [
    (0, express_validator_1.body)('title')
        .optional()
        .trim()
        .isLength(validLengths.title)
        .withMessage((0, helpers_1.createLengthErrorMessage)('title', validLengths.title))
        .escape(),
];
exports.Chat = db_1.db.model('Chat', ChatSchema);
