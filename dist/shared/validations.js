"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortOrderValidation = void 0;
const express_validator_1 = require("express-validator");
const const_1 = require("./const");
exports.sortOrderValidation = [
    (0, express_validator_1.query)('sort')
        .optional()
        .isIn(const_1.SORT_ORDER_VALUES)
        .withMessage(`Wrong sort query, valid varations: ${const_1.SORT_ORDER_VALUES.join(', ')}`),
];
