import mongoose, { Schema } from 'mongoose';
import { Review } from './Review.js';

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
    avarageOfRatings: {
        type: Number,
        required: false,
        default: 0,
    },
});

export const Book = mongoose.model('Book', bookSchema)