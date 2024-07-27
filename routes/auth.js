import { configDotenv } from 'dotenv';
import express from 'express';
import { handleLogin } from '../controllers/authController.js';
const router = express.Router();

configDotenv({ path: '.env' });

router.post('/login', handleLogin);

export default router;
