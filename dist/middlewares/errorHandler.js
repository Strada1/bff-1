"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_status_1 = __importDefault(require("http-status"));
function errorHandler(error, req, res, next) {
    if (error.statusCode) {
        return res
            .status(error.statusCode)
            .send({ meta: error.message, error: error.data });
    }
    if (error.name === 'CastError') {
        return res.status(http_status_1.default.NOT_FOUND).send({ meta: error.message });
    }
    res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send({ error });
    next();
}
exports.errorHandler = errorHandler;
