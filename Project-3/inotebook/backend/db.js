const mongoose = require('mongoose');
const mongoURI = "mongodb://0.0.0.0:27017/inotebook"; // Assuming inotebook is your database name, sometimes localhost instead of 0.0.0.0 doesn't works accordingly

const connectToMongo = () => {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to MongoDB");
    }).catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
    });
}

module.exports = connectToMongo;
