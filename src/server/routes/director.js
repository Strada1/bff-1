const express = require("express")
const { getDirector, addDirector, removeDirector, updateDirector } = require("../services/directorService");
const app = express()

const showDirector = app.get('/director', async (req, res) => {
  try {
    const director = await getDirector();
    return res.status(200).json(director);
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const createDirector = app.post("/director", async (req, res) => {
  try {
    if (!req.body) return res.status(400).send('Director not created!');
    await addDirector(req.body);
    return res.status(201).send('Director created');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const deleteDirector = app.delete('/director/:directorId', async (req, res) => {
  try {
    if (!req.body && !req.params.directorId) return res.status(400).send('Director not deleted!');
    const id = req.params.directorId;
    await removeDirector(id)
    return res.status(201).send('Director deleted.');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

const changeDirector = app.put('/director/:directorId', async (req, res) => {
  try {
    if (!req.body && req.params.directorId) return res.status(400).send('Director not change!');
    const id = req.params.directorId;
    await updateDirector(id, req.body)
    return res.status(201).send('Director change.');
  } catch (e) {
    return res.status(500).send(e.message);
  }
})

module.exports = { createDirector, showDirector, deleteDirector, changeDirector };