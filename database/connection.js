import mongoose from "mongoose";
import dotenv from "dotenv";

// Config .env
dotenv.config();

const { DB_HOST, DB_PORT, DB_NAME } = process.env;

// Define connection config
const URI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

// Connect to mongodb
const connection = async () => {
    return await mongoose.connect(URI);
};

export default await connection();
