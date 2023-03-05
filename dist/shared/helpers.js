"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenFromBearerString = exports.getRandomInt = exports.isAdmin = exports.createLengthErrorMessage = exports.validateLength = exports.convertQueryToArray = void 0;
const const_1 = require("./const");
function convertQueryToArray(string) {
    return string ? string.split(',') : [];
}
exports.convertQueryToArray = convertQueryToArray;
function validateLength(value, { min, max }) {
    return (value === null || value === void 0 ? void 0 : value.length) > min && (value === null || value === void 0 ? void 0 : value.length) < max;
}
exports.validateLength = validateLength;
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
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
exports.getRandomInt = getRandomInt;
function getTokenFromBearerString(authorization) {
    return authorization ? authorization.split(' ')[1] : '';
}
exports.getTokenFromBearerString = getTokenFromBearerString;
