function sendError(errorArray, res, status) {
  const errorTextArray = [];
  errorArray.forEach((error) => errorTextArray.push(error.msg));
  const errorText = errorTextArray.join('\n');
  return res.status(status).send(errorText);
}

module.exports = sendError;
