const CommentModel = require('../models/comment')
const express = require("express")
const app = express()

const addComment = app.get('/comments', async (req, res) => {
  try {
    await CommentModel.create(req.body)
    return res.status(200).json('Comment added.');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

module.exports = { addComment };