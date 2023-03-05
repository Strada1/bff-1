"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = exports.messageValidation = void 0;
const express_validator_1 = require("express-validator");
const db_1 = require("../ext/db");
const helpers_1 = require("../shared/helpers");
const MessageSchema = new db_1.db.Schema({
    user: { type: 'ObjectId', ref: 'User', required: true },
    text: { type: 'String', required: true },
    chatId: { type: 'ObjectId', ref: 'Chat', required: true },
    __v: { type: Number, select: false },
}, { timestamps: true });
const validLengths = {
    text: { min: 1, max: 300 },
};
exports.messageValidation = [
    (0, express_validator_1.body)('user').optional().isMongoId(),
    (0, express_validator_1.body)('text')
        .optional()
        .trim()
        .isLength(validLengths.text)
        .withMessage((0, helpers_1.createLengthErrorMessage)('text', validLengths.text))
        .escape(),
    (0, express_validator_1.body)('chatId').optional().isMongoId(),
];
exports.Message = db_1.db.model('Message', MessageSchema);
