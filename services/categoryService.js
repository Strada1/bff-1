const {Category} = require("../models");

const createCategory = (body) => {
    return Category.create(body)
}

module.exports = {
    createCategory,
}