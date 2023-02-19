const db = require("../db");

const CategorySchema = new db.Schema({
    title: String
});

const Category = db.model("Category", CategorySchema);
module.exports = { Category };
