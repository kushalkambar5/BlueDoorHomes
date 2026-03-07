import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI).then((data) => {
    console.log(`MongoDB connected with server: ${data.connection.host}`);
}).catch((err) => {
    console.log(err);
});