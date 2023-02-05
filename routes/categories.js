const express = require("express");
const router = express.Router();
const { getCategories, createCategory, updateCategory, deleteCategory } = require("../services/category");

router.route("/")
.get(async (req, res) => {
    try {
        const categories = await getCategories();
        return res.status(200).send(categories);
    } catch(e) {
        return res.status(500).json({error: e, message: "Error when receiving categories"});
    }
})
.post(async (req, res) => {
    try {
        const values = req.body;
        await createCategory(values);
        return res.status(201).send("Category added");
    } catch(e) {
        return res.status(500).json({error: e, message: "Error when adding a movie"});
    }
})

router.route("/:categoryId")
.put(async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const values = req.body;
        await updateCategory(categoryId, values);
        return res.status(200).send("Category updated");
    } catch(e) {
        return res.status(500).josn({error: e, message: "Error when updating a category"});
    }
})
.delete(async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        await deleteCategory(categoryId);
        return res.status(200).send("Category deleted");
    } catch (e) {
        return res.status(500).json({error: e, message: "Error when deleting a category"});
    }
});

module.exports = router;
