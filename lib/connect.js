const express = require('express');
const mongoose = require('mongoose');

function createApp() {
	const app = express();
	app.use(express.json());

	return app;
}

function connectMongoose(url) {
	mongoose.set('strictQuery', true);
	mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

	return mongoose;
}

function connectApp(app, port) {
	app.listen(port, () => {
		console.log(`Server listening on port ${port}`)
	});
}

module.exports = {
	createApp,
	connectMongoose,
	connectApp
}