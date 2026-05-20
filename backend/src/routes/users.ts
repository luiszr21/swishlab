import { Router, Response } from 'express';
import pool from '../database/connection';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Get user profile
router.get('/:userId', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const { userId } = req.params;

  if (req.userId !== userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    const result = await pool.query(
      'SELECT id, email, username, preferred_position, created_at, updated_at FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update user profile
router.patch('/:userId', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const { userId } = req.params;
  const { username, preferred_position } = req.body;

  if (req.userId !== userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    const result = await pool.query(
      'UPDATE users SET username = COALESCE($1, username), preferred_position = COALESCE($2, preferred_position), updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING id, email, username, preferred_position, updated_at',
      [username || null, preferred_position || null, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Get training history
router.get('/:userId/training-history', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const { userId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  if (req.userId !== userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  try {
    const start = (page - 1) * limit;

    const totalResult = await pool.query(
      'SELECT COUNT(*) FROM training_history WHERE user_id = $1',
      [userId]
    );

    const result = await pool.query(
      'SELECT id, training_id, position_id, completed_at, duration_minutes FROM training_history WHERE user_id = $1 ORDER BY completed_at DESC LIMIT $2 OFFSET $3',
      [userId, limit, start]
    );

    res.json({
      history: result.rows,
      total: parseInt(totalResult.rows[0].count),
      page,
      limit
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch training history' });
  }
});

// Add training to history
router.post('/:userId/training-history', authMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const { userId } = req.params;
  const { training_id, position_id, completed_at, duration_minutes } = req.body;

  if (req.userId !== userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  if (!training_id || !position_id || !completed_at) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO training_history (user_id, training_id, position_id, completed_at, duration_minutes) VALUES ($1, $2, $3, $4, $5) RETURNING id, training_id, position_id, completed_at, duration_minutes',
      [userId, training_id, position_id, completed_at, duration_minutes || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add training to history' });
  }
});

export default router;
