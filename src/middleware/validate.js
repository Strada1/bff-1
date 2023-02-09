const validate = (fields) => {
  return function(req, res, next) {
    const keysArr = Object.keys(req.body);

    for (const field of fields) {
      const hasField = keysArr.findIndex((item) => item === field) !== -1;

      if (!hasField) {
        return res.status(404).send('No required fields!')
      }
    }
    next()
  }
}


module.exports = validate;