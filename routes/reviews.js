import express from 'express';
import { verifyJWT } from '../middleware/verifyJWT.js';
import { handleEditReview, handleDeleteReview } from '../controllers/reviewsController.js';
const router = express.Router();

router.patch('/:id', verifyJWT, handleEditReview);

router.delete('/:id', verifyJWT, handleDeleteReview);

export default router;