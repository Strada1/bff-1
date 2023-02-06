"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(statusCode, message, data) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
    }
}
exports.default = ApiError;
