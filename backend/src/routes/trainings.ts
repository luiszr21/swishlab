import { Router } from 'express';
import { getTraining, listTrainingsByCategory, listTrainingsBySkill } from '../controllers/trainingController';

const router = Router();

router.get('/by-category/:categoryId', listTrainingsByCategory);
router.get('/skill/:skill', listTrainingsBySkill);
router.get('/:trainingId', getTraining);

export default router;
