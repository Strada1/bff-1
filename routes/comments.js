import commentService from '../services/commentService.js';

function addCommentsRoutes(router) {
  router.get('/:movieId/comments/:commentId', async (req, res) => {
    const { commentId } = req.params;
    try {
      const comment = await commentService.getComment(commentId);
      return res.status(201).send(comment);
    } catch {
      return res.status(500).send('request error');
    }
  });

  router.post('/:movieId/comments', async (req, res) => {
    const { movieId } = req.params;
    try {
      await commentService.addComment(movieId, req.body.comment);
      return res.status(201).send('comment added');
    } catch {
      return res.status(500).send('request error');
    }
  });

  router.put('/:movieId/comments/:commentId', async (req, res) => {
    const { commentId } = req.params;

    try {
      await commentService.updateComment(commentId, req.body.comment);
      return res.status(201).send('comment updated');
    } catch {
      return res.status(500).send('request error');
    }
  });

  router.delete('/:movieId/comments/:commentId', async (req, res) => {
    const { movieId, commentId } = req.params;

    try {
      await commentService.deleteComment({ commentId, movieId });
      return res.status(201).send('comment deleted');
    } catch {
      return res.status(500).send('request error delete comment');
    }
  });
}

export default addCommentsRoutes;
