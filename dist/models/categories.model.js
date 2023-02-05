"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const db_1 = require("../ext/db");
const CategorySchema = new db_1.db.Schema({
    title: String,
    __v: { type: Number, select: false },
});
exports.Category = db_1.db.model('Category', CategorySchema);
