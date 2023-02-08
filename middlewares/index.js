const validateMovie = (req, res, next) => {

  const result = [req.body.title, req.body.category, req.body.year, req.body.duration, req.body.director].filter(item => item === undefined)

  if (result.length > 0) {
    return res.status(401).send("Fill all necessary fields");
  }

  next();
}


const validateDirector = (req, res, next) => {

  const result = [req.body.name, req.body.surname, req.body.yearOfBirth].filter(item => item === undefined)

  if (result.length > 0) {
    return res.status(401).send("Fill all necessary fields");
  }

  next();
}


module.exports = { validateMovie, validateDirector }