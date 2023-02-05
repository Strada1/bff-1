const express = require("express")
const app = express()

const createComment = app.post('/comments', async (req, res) => {
  try {
    if (!req.body) return res.status(400).send('Comment not created!');
    await createComment(req.body)
    return res.status(200).json('Comment added.');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

module.exports = { createComment };