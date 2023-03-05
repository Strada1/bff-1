"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonTransform = void 0;
function jsonTransform(data) {
    return JSON.parse(JSON.stringify(data));
}
exports.jsonTransform = jsonTransform;
