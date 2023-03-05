"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUsersMock = exports.userTemplate = exports.wrongUserId = void 0;
const const_1 = require("../../shared/const");
const tokenService = __importStar(require("../../services/token.service"));
exports.wrongUserId = '63e382d1848d4c8af8847773';
exports.userTemplate = {
    email: 'lorem@ipsum.dev',
    username: 'dolor',
    password: 'sit amet123',
};
function generateUsersMock(count) {
    const result = [];
    for (let i = 0; i < count; i += 1) {
        const token = tokenService.createToken(exports.userTemplate.email + i);
        result.push(Object.assign(Object.assign({}, exports.userTemplate), { email: exports.userTemplate.email + i, username: exports.userTemplate.username + i, password: exports.userTemplate.password + i, roles: [const_1.ROLES.USER], chats: ['64032e40e4b706cfe6224847'], token }));
    }
    return result;
}
exports.generateUsersMock = generateUsersMock;
