import express from 'express';
import { verifyJWT } from '../middleware/verifyJWT.js';
import { handleGetAllBooks, getBookParamId, handleGetAllReviewsByBookId, handleGetReviewAvarageByBookId, handleNewBook, handleNewReview, handleEditBook, handleDeleteBook} from '../controllers/booksController.js'

const router = express.Router();

router.get('/', handleGetAllBooks);

router.get('/:id', getBookParamId);

router.get('/:bookid/reviews', handleGetAllReviewsByBookId);

router.get('/:bookid/reviews-average', handleGetReviewAvarageByBookId);

router.post('/', handleNewBook);

router.post('/:bookid/reviews', verifyJWT, handleNewReview);

router.patch('/:id', handleEditBook);

router.delete('/:id', handleDeleteBook);

export default router;