import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

configDotenv({path: '.env'})
const connectionString = process.env.MONGO_URL;
    //'mongodb+srv://lucymor:cBl14GczFPqBLlBT@mongodbtest.ebawtuu.mongodb.net/?retryWrites=true&w=majority&appName=MongoDBtest';

export async function connectDB(){
    try {
    await mongoose.connect(connectionString);
    } catch (e) {
    console.error(e);
    }
} 
