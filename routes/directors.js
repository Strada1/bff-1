const express = require("express");
const router = express.Router();
const { getDirector, getDirectors, createDirector, updateDirector, deleteDirector } = require("../services/director");
const { body, validationResult } = require("express-validator");

router.route("/")
.get(
    body("firstname")
        .exists().withMessage("There is no field firstname")
        .bail()
        .notEmpty().withMessage("The field firstname is empty"),
    body("lastname")
        .exists().withMessage("There is no field lastname")
        .bail()
        .notEmpty().withMessage("The field lastname is empty"),
    body("born")
        .exists().withMessage("There is no field born")
        .bail()
        .notEmpty().withMessage("The field born is empty"),
    body("about")
        .exists().withMessage("There is no field about")
        .bail()
        .notEmpty().withMessage("The field about is empty"),
    async (req, res) => {
    try {
        const directors = await getDirectors();
        return res.status(200).send(directors);
    } catch (e) {
        return res.status(500).json({error: e, message: "Error when receiving directors"});
    }
})
.post(async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        const values = req.body;
        await createDirector(values);
        return res.status(201).send("Director created");
    } catch (e) {
        return res.status(500).json({error: e, message: "Error when adding a direcor"});
    }
});

router.route("/:directorId")
.get(async (req, res) => {
    try {
        const directorId = req.params.directorId;
        const director = await getDirector(directorId);
        return res.status(200).send(director);
    } catch (e) {
        return res.status(500).json({error: e, message: "Error when reciving a director"});
    }
})
.put(async (req, res) => {
    try {
        const directorId = req.params.directorId;
        const values = req.body;
        await updateDirector(directorId, values);
        return res.status(200).send("Director updated");
    } catch (e) {
        return res.status(500).json({error: e, message: "Error when updating a director"});
    }
})
.delete(async (req, res) => {
    try {
        const directorId = req.params.directorId;
        await deleteDirector(directorId);
        return res.status(200).send("Director deleted");
    } catch (e) {
        return res.status(500).json({error: e, message: "Error when deleting a director"});
    }
});

module.exports = router;
