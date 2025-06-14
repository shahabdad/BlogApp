const mongoose = require("mongoose");
const colors  = require('colors')
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL); 
console.log(`Connected ti Mongodb Datbase ${mongoose.connection.host}.bgMagenta.green`)

    } catch (error) {
        // console.error(`MONGO Connect Error: ${error.message}`);
        // process.exit(1); // Exit the process with failure
        console.log(`MONGO Connect Error ${error}`.bgRed.white);
    }
};

module.exports = connectDB;
