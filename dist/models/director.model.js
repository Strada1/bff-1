"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Director = void 0;
const db_1 = require("../ext/db");
const DirectorSchema = new db_1.db.Schema({
    firstName: { type: 'String', required: true },
    lastName: { type: 'String', required: true },
    __v: { type: Number, select: false },
});
exports.Director = db_1.db.model('Director', DirectorSchema);
