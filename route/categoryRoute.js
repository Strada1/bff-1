const {
  categoryCreate,
  categoryDelete,
  categoryEdit,
  allCategories,
} = require("../services/categoriesServices");
const express = require("express");
const app = express();

const getAllCategory = app.get("/categories", async (req, res) => {
  try {
    const movies = await allCategories();

    return res.status(201).send(movies);
  } catch (e) {
    return res.status(500).send(e);
  }
});

const createCategory = app.post("/categories", async (req, res) => {
  try {
    await categoryCreate(req);

    return res.status(201).send("category created");
  } catch (e) {
    return res.status(500).send("error " + e);
  }
});

const deleteCategory = app.delete(
  "/categories/:categoryId",
  async (req, res) => {
    try {
      await categoryDelete(req);

      return res.status(200).send("category deleted");
    } catch (e) {
      return res.status(500).send(e);
    }
  }
);

const editCategory = app.put("/categories/:categoryId", async (req, res) => {
  try {
    let updateCategory = await categoryEdit(req);

    return res.status(200).send(updateCategory);
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategory,
};
