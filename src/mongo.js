const mongoose = require("mongoose");
require("dotenv").config();
const mongoPath = process.env.MONGODB_URI;

module.exports = async () => {
    await mongoose.connect(mongoPath);
    return mongoose;
};
