const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

async function connectDB() {
    try {
        const url = "mongodb://localhost:27017/main";
        mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("BD started");
    } catch(e) {
        console.log("DB failed");
    }   
}

module.exports = {
    db: mongoose,
    connectDB
};
