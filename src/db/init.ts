import mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL as string).then(() => {
            console.log("Connected");
        });
    } catch { 
        console.log("Error while connecting to Database");
        throw new Error("connectDB Error");
    }
}

module.exports = connectDB;
