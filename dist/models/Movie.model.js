"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const db_1 = require("../ext/db");
const MovieSchema = new db_1.db.Schema({
    title: String,
    category: String,
    year: Number,
    duration: Number,
    director: String,
});
exports.Movie = db_1.db.model('Movie', MovieSchema);
