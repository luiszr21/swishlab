import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { createTrainingHistoryEntry, getTrainingHistoryByUserId, updateTrainingHistoryNotes } from '../models/trainingHistoryModel';
import { findUserById, updateUserProfile } from '../models/userModel';

export async function getProfile(req: AuthenticatedRequest, res: Response) {
  const { userId } = req.params;

  if (req.userId !== userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    const user = await findUserById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch user' });
  }
}

export async function patchProfile(req: AuthenticatedRequest, res: Response) {
  const { userId } = req.params;
  const { username, preferred_position } = req.body;

  if (req.userId !== userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    const user = await updateUserProfile(userId, {
      username,
      preferredPosition: preferred_position,
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update user' });
  }
}

export async function getTrainingHistory(req: AuthenticatedRequest, res: Response) {
  const { userId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  if (req.userId !== userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    const result = await getTrainingHistoryByUserId(userId, page, limit);

    return res.json({
      history: result.history,
      total: result.total,
      page,
      limit,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch training history' });
  }
}

export async function postTrainingHistory(req: AuthenticatedRequest, res: Response) {
  const { userId } = req.params;
  const { training_id, position_id, completed_at, duration_minutes, notes } = req.body;

  if (req.userId !== userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (!training_id || !position_id || !completed_at) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const entry = await createTrainingHistoryEntry({
      userId,
      trainingId: training_id,
      positionId: position_id,
      completedAt: completed_at,
      durationMinutes: duration_minutes ?? null,
      notes: notes ?? null,
    });

    return res.status(201).json(entry);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to add training to history' });
  }
}

export async function patchTrainingHistory(req: AuthenticatedRequest, res: Response) {
  const { userId, historyId } = req.params;
  const { notes } = req.body;

  if (req.userId !== userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (typeof notes !== 'string') {
    return res.status(400).json({ error: 'Notes are required' });
  }

  try {
    const updated = await updateTrainingHistoryNotes(userId, historyId, notes);

    if (!updated) {
      return res.status(404).json({ error: 'Training history not found' });
    }

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update training history' });
  }
}