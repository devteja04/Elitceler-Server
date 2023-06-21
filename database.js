const mongoose = require('mongoose');
const env = require("dotenv");
env.config();
const URI = process.env.URI;

const createDatabaseConnection = async () => {
    mongoose.connect(URI).then(() => {
        console.log('Database Connected!');
    }).catch(() => {
        console.log('Error connecting to Database');
    })
}

module.exports = createDatabaseConnection;