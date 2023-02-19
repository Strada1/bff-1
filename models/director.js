const db = require("../db");

const DirectorSchema = new db.Schema({
    firstname: String,
    lastname: String,
    born: Date,
    about: String
});
const Director = db.model("Director", DirectorSchema);
module.exports = { Director };
