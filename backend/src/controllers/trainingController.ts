import { Response } from 'express';
import { getTrainingById, getTrainingsByCategory, getTrainingsBySkill } from '../models/catalogModel';

export function listTrainingsByCategory(req: any, res: Response) {
  const { categoryId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const result = getTrainingsByCategory(categoryId, page, limit);

  if (!result) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  return res.json({ trainings: result.trainings, total: result.total, page, limit });
}

export function listTrainingsBySkill(req: any, res: Response) {
  const { skill } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const result = getTrainingsBySkill(skill, page, limit);

  if (!result) {
    return res.status(400).json({ error: 'Invalid skill' });
  }

  return res.json({ trainings: result.trainings, total: result.total, page, limit });
}

export function getTraining(req: any, res: Response) {
  const { trainingId } = req.params;
  const training = getTrainingById(trainingId);

  if (!training) {
    return res.status(404).json({ error: 'Training not found' });
  }

  return res.json(training);
}