import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { login, logout, me, register } from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, me);
router.post('/logout', authMiddleware, logout);

export default router;
