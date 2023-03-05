"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagePayloadValidation = exports.sortOrderValidation = void 0;
const express_validator_1 = require("express-validator");
const mongodb_1 = require("mongodb");
const const_1 = require("./const");
const helpers_1 = require("./helpers");
const config_1 = require("../config");
exports.sortOrderValidation = [
    (0, express_validator_1.query)('sort')
        .optional()
        .isIn(const_1.SORT_ORDER_VALUES)
        .withMessage(`Wrong sort query, valid varations: ${const_1.SORT_ORDER_VALUES.join(', ')}`),
];
function messagePayloadValidation({ message, chatId, }) {
    const result = { isValidPayload: true, error: '' };
    const isValidMessage = (0, helpers_1.validateLength)(message, config_1.config.messageLengthLimits);
    const isValidChatId = mongodb_1.ObjectId.isValid(chatId);
    if (!isValidMessage) {
        result.isValidPayload = false;
        result.error = (0, helpers_1.createLengthErrorMessage)('Message', config_1.config.messageLengthLimits);
        return result;
    }
    if (!isValidChatId) {
        result.isValidPayload = false;
        result.error = const_1.ERROR_TEXT.MESSAGES.NOT_VALID_CHAT_ID;
        return result;
    }
    return result;
}
exports.messagePayloadValidation = messagePayloadValidation;
