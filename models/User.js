import mongoose, { Schema } from 'mongoose';
import { Review } from './Review.js';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }]
});

export const User = mongoose.model('User', userSchema)