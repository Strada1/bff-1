function createMovieValidate(fields = ['title', 'director']) {
  return function (req, res, next) {
    const bodyKeys = new Set(Object.keys(req.body));

    for (const field of fields) {
      const isNoKeyInBody = !bodyKeys.has(field);
      if (isNoKeyInBody) {
        return res.status(401).send('No required fields!');
      }
    }

    next();
  };
}

export default {
  createMovieValidate,
};
