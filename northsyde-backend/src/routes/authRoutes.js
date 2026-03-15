import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/authcontroller.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/register', upload.single('portfolio'), registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

export default router;