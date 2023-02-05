const db = require("../db");

const CommentSchema = new db.Schema({
    createdAt: {type: Date, default: Date.now()},
    movieId: "ObjectId",
    user: String,
    text: String,
});
const Comment = db.model("Comment", CommentSchema);
module.exports = { Comment };
