const {Comment} = require("../models");

const createComment = (body) => {
    return Comment.create(body);
}

module.exports = {
    createComment,
}