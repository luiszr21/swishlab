import pool from '../database/connection';

export interface TrainingHistoryRecord {
  id: string;
  user_id: string;
  training_id: string;
  position_id: string;
  completed_at: string;
  duration_minutes: number | null;
  notes: string | null;
}

export async function getTrainingHistoryByUserId(userId: string, page: number, limit: number): Promise<{ history: TrainingHistoryRecord[]; total: number }> {
  const offset = (page - 1) * limit;

  const totalResult = await pool.query('SELECT COUNT(*)::int AS count FROM training_history WHERE user_id = $1', [userId]);
  const historyResult = await pool.query(
    `SELECT id, user_id, training_id, position_id, completed_at, duration_minutes, notes
     FROM training_history
     WHERE user_id = $1
     ORDER BY completed_at DESC
     LIMIT $2 OFFSET $3`,
    [userId, limit, offset]
  );

  return {
    history: historyResult.rows,
    total: totalResult.rows[0]?.count ?? 0,
  };
}

export async function createTrainingHistoryEntry(input: {
  userId: string;
  trainingId: string;
  positionId: string;
  completedAt: string;
  durationMinutes?: number | null;
  notes?: string | null;
}): Promise<TrainingHistoryRecord> {
  const result = await pool.query(
    `INSERT INTO training_history (user_id, training_id, position_id, completed_at, duration_minutes, notes)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, user_id, training_id, position_id, completed_at, duration_minutes, notes`,
    [input.userId, input.trainingId, input.positionId, input.completedAt, input.durationMinutes ?? null, input.notes ?? null]
  );

  return result.rows[0];
}

export async function updateTrainingHistoryNotes(userId: string, historyId: string, notes: string): Promise<TrainingHistoryRecord | null> {
  const result = await pool.query(
    `UPDATE training_history
     SET notes = $1
     WHERE id = $2 AND user_id = $3
     RETURNING id, user_id, training_id, position_id, completed_at, duration_minutes, notes`,
    [notes, historyId, userId]
  );

  return result.rows[0] ?? null;
}