const express = require("express");
const router = express.Router();
const MovieSchema = require("../models/movie");
const {
  editComments,
  deleteComments,
  addComments,
} = require("../services/comments");
const { body, validationResult, check } = require("express-validator");
const { createMovie, editMovie, deleteMovie } = require("../services/movie");

const titleValidator = async (value) => {
  const matchedFilm = await MovieSchema.findOne({ title: value });
  if (matchedFilm) {
    throw new Error("This film is already exist!");
  }
  return true;
};

const ratingValidator = async (value) => {
  if (value > 10) {
    throw new Error("Rating must be less than 10!");
  } 

  if (value < 0) {
    throw new Error("Rating can't be less than 0!");
  }

  return true;
};

const likesValidator = (value) => {
  if (value < 0) {
    throw new Error("The score can't be less than 0!");
  }
  return true;
};

router.get("/", async (req, res) => {
  try {
    const movieList = req.query.populate
      ? await MovieSchema.find().populate("category comments director")
      : await MovieSchema.find();
    return res.status(200).send(movieList);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post(
  "/add",
  body("category").isString(),
  body("director").isString(),
  check("rating").custom(ratingValidator),
  body("year").isNumeric().isLength({ min: 4, max: 4 }),
  body("title").isString().custom(titleValidator),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const addedMovie = await createMovie(req.body);

      return res.status(201).send(addedMovie);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

router.put(
  "/edit/:id",
  body("category").isString(),
  body("director").isString(),
  check("rating").custom(ratingValidator),
  body("year").isNumeric().isLength({ min: 4 }),
  body("title").isString().custom(titleValidator),
  async (req, res) => {
    try {
      const updatedMovie = await editMovie(req);
      return res.status(201).send(updatedMovie);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

router.put(
  "/add_comments/:id/",
  body("name").isString(),
  body("like").isNumeric().custom(likesValidator),
  body("dislike").isNumeric().custom(likesValidator),
  body("text").isString(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const currentMovie = await addComments(req);
      return res.status(201).send(currentMovie);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

router.delete("/delete_comments/:id/comments/:commentId", async (req, res) => {
  try {
    const currentMovie = await deleteComments(req.params);
    return res.status(201).send(currentMovie);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put(
  "/edit_comments/:commentId",
  body("name").isString(),
  body("like").isNumeric().custom(likesValidator),
  body("dislike").isNumeric().custom(likesValidator),
  body("text").isString(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const currentComment = await editComments(req);
      return res.status(201).send(currentComment);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
);

router.delete("/delete/:id", async (req, res) => {
  try {
    const updatedMovie = await deleteMovie(req.params);
    return res.status(200).send(updatedMovie);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
