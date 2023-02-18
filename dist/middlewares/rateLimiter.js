"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const miliseconds_1 = __importDefault(require("miliseconds"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../shared/ApiError"));
const const_1 = require("../shared/const");
// TODO rewrite to fingerprint verification instead of ip
const rateLimiter = (options = {
    windowMs: new miliseconds_1.default().hours(1).value(),
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
}) => (0, express_rate_limit_1.default)(Object.assign(Object.assign({}, options), { handler: () => {
        throw new ApiError_1.default(http_status_1.default.TOO_MANY_REQUESTS, const_1.ERROR_TEXT.SERVER.TOO_MANY_REQUESTS);
    } }));
exports.rateLimiter = rateLimiter;
