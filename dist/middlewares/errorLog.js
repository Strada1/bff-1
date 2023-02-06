"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLog = void 0;
function errorLog(error, req, res, next) {
    console.log(error);
    next(error);
}
exports.errorLog = errorLog;
