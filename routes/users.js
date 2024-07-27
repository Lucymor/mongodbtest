import express from 'express';
import { verifyJWT } from '../middleware/verifyJWT.js';
import { handleGetAllUsers, handleGetMe, getUserByParamId, handleNewUser, handleEditUser, handleDeleteUser } from '../controllers/usersController.js';
const router = express.Router();

router.get('/', handleGetAllUsers);

router.get('/me', verifyJWT, handleGetMe);

router.get('/:id', getUserByParamId);

router.post('/', handleNewUser);

router.patch('/:id', handleEditUser);

router.delete('/:id', handleDeleteUser);

export default router;