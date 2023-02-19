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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = exports.deleteUser = exports.updateUser = exports.removeRoleFromUser = exports.addRoleToUser = exports.createUser = exports.checkRole = exports.getUserByToken = exports.getUserByEmail = exports.getUser = exports.getUsers = void 0;
const users_model_1 = require("../models/users.model");
const passwordService = __importStar(require("./password.service"));
const tokenService = __importStar(require("./token.service"));
function getUsers() {
    return users_model_1.User.find();
}
exports.getUsers = getUsers;
function getUser(id) {
    return users_model_1.User.findById(id);
}
exports.getUser = getUser;
function getUserByEmail(email) {
    return users_model_1.User.findOne({ email }).lean();
}
exports.getUserByEmail = getUserByEmail;
function getUserByToken(token) {
    return users_model_1.User.findOne({ token }).lean();
}
exports.getUserByToken = getUserByToken;
function checkRole(user, role) {
    const roles = user === null || user === void 0 ? void 0 : user.roles;
    return roles === null || roles === void 0 ? void 0 : roles.includes(role);
}
exports.checkRole = checkRole;
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashPassword = yield passwordService.encryptPassword(user.password);
        const token = tokenService.createToken({ _id: user._id });
        return users_model_1.User.create(Object.assign(Object.assign({}, user), { password: hashPassword, token }));
    });
}
exports.createUser = createUser;
function addRoleToUser(id, role) {
    return __awaiter(this, void 0, void 0, function* () {
        return users_model_1.User.findByIdAndUpdate({ _id: id }, { $addToSet: { roles: role } }, { new: true });
    });
}
exports.addRoleToUser = addRoleToUser;
function removeRoleFromUser(id, role) {
    return __awaiter(this, void 0, void 0, function* () {
        return users_model_1.User.findByIdAndUpdate({ _id: id }, { $pull: { roles: role } }, { new: true });
    });
}
exports.removeRoleFromUser = removeRoleFromUser;
function updateUser(id, { username, password }) {
    return __awaiter(this, void 0, void 0, function* () {
        const newData = { username };
        if (password) {
            newData.password = yield passwordService.encryptPassword(password);
        }
        return users_model_1.User.findByIdAndUpdate(id, newData, { new: true }).lean();
    });
}
exports.updateUser = updateUser;
function deleteUser(id) {
    return users_model_1.User.findByIdAndDelete(id);
}
exports.deleteUser = deleteUser;
function authUser(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield getUserByEmail(email);
        if (!user) {
            return {};
        }
        const isPasswordCorrect = yield passwordService.comparePassword(password, user.password);
        return {
            user,
            isPasswordCorrect,
        };
    });
}
exports.authUser = authUser;
