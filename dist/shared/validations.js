"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortOrderValidation = exports.SORT_ORDER_VALUES = void 0;
const express_validator_1 = require("express-validator");
exports.SORT_ORDER_VALUES = [
    '',
    -1,
    1,
    'asc',
    'ascending',
    'desc',
    'descending',
];
exports.sortOrderValidation = [
    (0, express_validator_1.query)('sort')
        .optional()
        .isIn(exports.SORT_ORDER_VALUES)
        .withMessage(`Wrong sort query, valid varations: ${exports.SORT_ORDER_VALUES.join(', ')}`),
];
