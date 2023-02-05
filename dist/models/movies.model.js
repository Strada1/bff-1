"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const db_1 = require("../ext/db");
const MovieSchema = new db_1.db.Schema({
    title: String,
    category: { type: 'ObjectId', ref: 'Category' },
    year: Number,
    duration: Number,
    director: String,
    comments: [{ type: 'ObjectId', ref: 'Comment' }],
    __v: { type: Number, select: false },
});
exports.Movie = db_1.db.model('Movie', MovieSchema);
