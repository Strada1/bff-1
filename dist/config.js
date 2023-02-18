"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const miliseconds_1 = __importDefault(require("miliseconds"));
require('dotenv').config();
exports.config = {
    serverUrl: process.env.SERVER_URL,
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    jwtSecret: process.env.JWT_SECRET,
    allowedOrigins: process.env.ALLOWED_ORIGINS,
    rateLimits: {
        comments: { windowMs: new miliseconds_1.default().hours(1).value(), max: 100 },
        registration: { windowMs: new miliseconds_1.default().hours(1).value(), max: 10 },
        authentication: {
            windowMs: new miliseconds_1.default().hours(1).value(),
            max: 20,
            skipSuccessfulRequests: true,
        },
    },
};
