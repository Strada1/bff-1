const {Router} = require('express');
const {PATHS} = require('../constants');
const {getAllcomments, addComment, updateComment, deleteComment} = require('../service/db/commentsService');

const router = Router();

router.get(PATHS.COMMENTS.ALL, async (req, res) => {
  try {
    if (!req.params['movieId']) return res.status(400).send('wrong request params');
    const allComments = await getAllcomments(req.params['movieId']);
    res.status(201).json(allComments);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post(PATHS.COMMENTS.ALL, async (req, res) => {
  try {
    if (!req.body) return res.status(400).send('wrong request body');
    if (!req.params['movieId']) return res.status(400).send('wrong request params');
    await addComment(req.params['movieId'], req.body);
    res.status(201).send('comment added');
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
