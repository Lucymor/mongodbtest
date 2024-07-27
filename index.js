import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import auth from './routes/auth.js';
import users from './routes/users.js';
import books from './routes/books.js';
import reviews from './routes/reviews.js';
import mongoose from 'mongoose';
import { connectDB } from './database/connection.js';
import swaggerJSDoc from 'swagger-jsdoc';


connectDB()

const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());

// Load the routes
app.use('/users', users);
app.use('/books', books);
app.use('/reviews', reviews);
app.use('/auth', auth);

// Global error handling
app.use((err, _req, res, next) => {
    console.error(err);
    res.status(500).send('Uh oh! An unexpected error occured.');
});

// start the Express server
mongoose.connection.once('open', ()=>{
    console.log("Connected to MongoDB")
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
})