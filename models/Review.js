import mongoose, { Schema } from 'mongoose';
import { User } from './User.js';
import { Book } from './Book.js';

const reviewSchema = new Schema({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
        minLength: 50,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    book:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    }
});

export const Review = mongoose.model('Review', reviewSchema)