"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.createLengthErrorMessage = exports.convertQueryToArray = void 0;
const const_1 = require("./const");
function convertQueryToArray(string) {
    return string ? string.split(',') : [];
}
exports.convertQueryToArray = convertQueryToArray;
function createLengthErrorMessage(field, { min, max }) {
    if (min === max) {
        return `${field} length must be ${min} characters`;
    }
    if (min && !max) {
        return `${field} must be at least ${min} characters long`;
    }
    if (!min && max) {
        return `${field} must be less than ${max} characters`;
    }
    if (!min && !max) {
        return '';
    }
    return `${field} must be between ${min} and ${max} characters long`;
}
exports.createLengthErrorMessage = createLengthErrorMessage;
function isAdmin(roles) {
    return roles.includes(const_1.ROLES.ADMIN);
}
exports.isAdmin = isAdmin;
