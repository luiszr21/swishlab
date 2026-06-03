import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { getProfile, getTrainingHistory, patchProfile, patchTrainingHistory, postTrainingHistory } from '../controllers/userController';

const router = Router();

router.get('/:userId', authMiddleware, getProfile);
router.patch('/:userId', authMiddleware, patchProfile);
router.get('/:userId/training-history', authMiddleware, getTrainingHistory);
router.post('/:userId/training-history', authMiddleware, postTrainingHistory);
router.patch('/:userId/training-history/:historyId', authMiddleware, patchTrainingHistory);

export default router;
