"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const passport_1 = __importDefault(require("passport"));
function authentication() {
    return passport_1.default.authenticate('bearer', { session: false });
}
exports.authentication = authentication;
