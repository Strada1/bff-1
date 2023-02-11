"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
function isValidObjectId(id) {
    if (mongodb_1.ObjectId.isValid(id)) {
        if (String(new mongodb_1.ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}
