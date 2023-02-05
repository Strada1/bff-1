"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const db_1 = require("../ext/db");
const CommentSchema = new db_1.db.Schema({
    movieId: String,
    text: String,
});
exports.Comment = db_1.db.model('Comment', CommentSchema);
