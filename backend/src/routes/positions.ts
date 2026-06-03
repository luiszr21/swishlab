import { Router } from 'express';
import { getPosition, listPositions } from '../controllers/positionController';

const router = Router();

router.get('/', listPositions);
router.get('/:positionId', getPosition);

export default router;
