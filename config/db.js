const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const connectionString = process.env.CONNECTION_STRING;
mongoose.connect(connectionString, { useNewUrlParser: true });

module.exports = mongoose;
