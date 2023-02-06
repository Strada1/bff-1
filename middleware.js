
const validate = (name) => {
    return function (req, res, next) {
        if (name in req.body) {
                next();
            } else {
              return res.status(404).send(`${name} не найдено в теле запроса`)
            }
        }
}

module.exports = {
    validate,
}