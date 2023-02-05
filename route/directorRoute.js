const {
  director,
  directorCreate,
  directorDelete,
  directorUpdate,
  allDirectors,
} = require("../services/directorServices");
const express = require("express");
const app = express();

const getDirector = app.get("/director/:directorId", async (req, res) => {
  return await director(req);
});

const getAllDirectors = app.get("/directors", async (req, res) => {
  return await allDirectors();
});

const createDirector = app.post("/director", async (req, res) => {
  return await directorCreate(req);
});

const updateDirector = app.put("/director/:directorId", async (req, res) => {
  return await directorUpdate(req);
});

const deleteDirector = app.delete("/director/:directorId", async (req, res) => {
  return await directorDelete(req);
});

module.exports = {
  getDirector,
  getAllDirectors,
  createDirector,
  updateDirector,
  deleteDirector,
};
