import { Book } from '../models/Book.js';
import { Review } from '../models/Review.js';
import { User } from '../models/User.js';

export const handleGetAllBooks = async (req, res) => {
    let results = await Book.find({}).exec();
    res.send(results).status(200);
};

export const getBookParamId = async (req, res) => {
    const book = await Book.findById(req.params.id).populate('reviews').exec();
    res.send(book).status(200);
};

export const handleGetAllReviewsByBookId = async (req, res) => {
    const book = await Book.findById(req.params.bookid).populate('reviews').exec();
    res.send(book.reviews).status(200);
};

export const handleGetReviewAvarageByBookId = async (req, res) => {
    const book = await Book.findById(req.params.bookid)
        .populate('reviews')
        .exec();
    if (!book) return res.sendStatus(404);
    let sum = 0;
    sum = book.reviews
        .map((review) => review.stars)
        .reduce((ratingA, ratingB) => ratingA + ratingB, 0);

    const average = sum / book.reviews.length;

    res.send({ average }).status(200);
};

export const handleNewBook = async (req, res) => {
    const book = await Book.create(req.body);
    res.send(book).status(204);
};

export const handleNewReview = async (req, res) => {
    const user = await User.findOne({ username: req.user }).exec();
    if (!user) {
        return res.sendStatus(401);
    }
    const book = await Book.findById(req.params.bookid).exec();
    if (!book) {
        return res.sendStatus(404);
    }
    const review = await Review.create({ rating: req.body.rating, comment: req.body.comment, user: user, book: book });
    user.reviews.push(review);
    user.save();
    book.reviews.push(review);
    book.save();
    res.send(review.depopulate).status(200);
};

export const handleEditBook = async (req, res) => {
    const book = await Book.findById(req.params.id).exec();
    if (req.body.title) {
        book.title = req.body.title;
    }
    if (req.body.author) {
        book.author = req.body.author;
    }
    await book.save();
    res.send(book).status(200);
};

export const handleDeleteBook = async (req, res) => {
    let book = await Book.deleteOne({ _id: req.params.id });
    res.sendStatus(204);
};
