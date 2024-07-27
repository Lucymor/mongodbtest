import { Review } from '../models/Review.js';
import { User } from '../models/User.js';

export const handleEditReview = async (req, res) => {
    const review = await Review.findById(req.params.id).exec();
    const user = await User.findOne({ username: req.user }).exec();
    if (!user._id.equals(review.user)) {
        console.log(user._id, review.user);
        return res.sendStatus(403);
    }

    if (req.body.rating) {
        review.rating = req.body.rating;
    }
    if (req.body.text) {
        review.text = req.body.text;
    }
    await review.save();
    res.send(review).status(200);
};

export const handleDeleteReview = async (req, res) => {
    const review = await Review.findById(req.params.id).exec();
    if (!review) {
        return res.sendStatus(404);
    }
    const user = await User.findOne({ username: req.user }).exec();

    if (!user._id.equals(review.user)) {
        console.log(user._id, review.user);
        return res.sendStatus(403);
    }
    await review.deleteOne();
    res.sendStatus(204);
};
