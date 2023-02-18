"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../shared/ApiError"));
function errorHandler(error, req, res, next) {
    if (error instanceof ApiError_1.default) {
        return res
            .status(error.statusCode)
            .send({ meta: error.message, error: error.data });
    }
    if (error instanceof mongoose_1.default.Error.CastError ||
        error instanceof mongoose_1.default.Error.ValidationError) {
        return res.status(http_status_1.default.BAD_REQUEST).send({ meta: error.message });
    }
    res.status(http_status_1.default.INTERNAL_SERVER_ERROR).send({ error });
    next();
}
exports.errorHandler = errorHandler;
