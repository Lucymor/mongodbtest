import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

configDotenv({path: '.env'})
const connectionString = process.env.MONGO_URL;

export async function connectDB(){
    try {
    await mongoose.connect(connectionString);
    } catch (e) {
    console.error(e);
    }
} 
