"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const db_1 = require("../ext/db");
const MovieSchema = new db_1.db.Schema({
    title: { type: 'String', required: true },
    category: { type: 'ObjectId', ref: 'Category', required: true },
    year: Number,
    duration: Number,
    director: [{ type: 'ObjectId', ref: 'Director' }],
    comments: [{ type: 'ObjectId', ref: 'Comment' }],
    __v: { type: Number, select: false },
});
exports.Movie = db_1.db.model('Movie', MovieSchema);
