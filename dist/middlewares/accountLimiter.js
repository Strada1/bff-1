"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../shared/ApiError"));
const cooldownInMs = 60 * 60 * 1000;
const maxRequests = 5;
exports.rateLimiter = (0, express_rate_limit_1.default)({
    windowMs: cooldownInMs,
    max: maxRequests,
    standardHeaders: true,
    legacyHeaders: false,
    handler: () => {
        throw new ApiError_1.default(http_status_1.default.TOO_MANY_REQUESTS, 'Too many requests from this IP, please try again later!');
    },
});
