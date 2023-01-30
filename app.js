const models = require("./models.js")
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/movies', async (req, res) => {
	try{
		await models.Movie.create(req.body);
		return res.status(201).send('movie created');
	}catch(err) {
		return res.status(999).send(err.message);
	}
});

app.post("/categories", async (req, res) => {
	try{
		await models.Category.create(req.body);
		return res.status(200).send("category created");
	}catch(err){
		return res.status(999).send(err.message);
	}
});

app.listen(port);