"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../shared/ApiError"));
const const_1 = require("../shared/const");
function authorization(roles) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const user = req.user;
        const userRoles = user === null || user === void 0 ? void 0 : user.roles;
        if (!userRoles) {
            return next(new ApiError_1.default(http_status_1.default.UNAUTHORIZED, const_1.ERROR_TEXT.AUTH.NOT_ENOUGH_RIGHTS));
        }
        for (let i = 0; i < userRoles.length; i += 1) {
            const role = userRoles[i];
            if (roles.includes(role)) {
                return next();
            }
        }
        next(new ApiError_1.default(http_status_1.default.UNAUTHORIZED, const_1.ERROR_TEXT.AUTH.NOT_ENOUGH_RIGHTS));
    });
}
exports.authorization = authorization;
