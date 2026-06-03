import { Response } from 'express';
import { getPositionById, getPositions } from '../models/catalogModel';

export function listPositions(req: any, res: Response) {
  const includeTrainings = req.query.includeTrainings === 'true';
  return res.json({ positions: getPositions(includeTrainings) });
}

export function getPosition(req: any, res: Response) {
  const { positionId } = req.params;
  const position = getPositionById(positionId);

  if (!position) {
    return res.status(404).json({ error: 'Position not found' });
  }

  return res.json(position);
}