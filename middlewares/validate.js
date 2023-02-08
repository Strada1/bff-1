function validateBodyAndParamsFields(bodyFields, paramsFields) {
  return (req, res, next) => {
    for (const field of bodyFields) {
      if (!(field in req.body)) {
        return res.status(400).send('wrong body params');
      }
    }
    for (const field of paramsFields) {
      if (!(field in req.params)) {
        return res.status(400).send('wrong request params');
      }
    }
    next();
  };
}
module.exports = validateBodyAndParamsFields;
