const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
}, { versionKey: '_somethingElse' })

const Category = mongoose.model('Category', CategorySchema)

module.exports = {Category}
