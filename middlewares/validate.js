const { validationResult } = require('express-validator');

const validateParams = (params) => {
  return async (req, res, next) => {
    await Promise.all(params.map((validation) => validation.run(req)));
    const result = validationResult(req).formatWith(errorFormater);

    if (!result.isEmpty()) {
      return res.status(400).json({ error: result.array() });
    } else {
      next();
    }
  };
};

const errorFormater = ({ location, param, value }) => {
  return `${location}: [${param}]: is ${value}`;
};

module.exports = validateParams;
