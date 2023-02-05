"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Director = void 0;
const db_1 = require("../ext/db");
const DirectorSchema = new db_1.db.Schema({
    firstName: String,
    lastName: String,
    __v: { type: Number, select: false },
});
exports.Director = db_1.db.model('Director', DirectorSchema);
