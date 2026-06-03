import pool from './connection';

export async function runMigrations(): Promise<void> {
  const client = await pool.connect();

  try {
    console.log('Running database migrations...');

    await client.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto;`);

    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(255),
        password_hash VARCHAR(255) NOT NULL,
        preferred_position VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create training_history table
    await client.query(`
      CREATE TABLE IF NOT EXISTS training_history (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        training_id VARCHAR(255) NOT NULL,
        position_id VARCHAR(50) NOT NULL,
        completed_at TIMESTAMP NOT NULL,
        duration_minutes INTEGER,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`ALTER TABLE training_history ADD COLUMN IF NOT EXISTS notes TEXT;`);

    // Create indexes
    await client.query(`CREATE INDEX IF NOT EXISTS idx_training_history_user_id ON training_history(user_id);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_training_history_completed_at ON training_history(completed_at);`);

    console.log('✅ Database migrations completed successfully');
  } catch (error) {
    console.error('❌ Migration error:', error);
    throw error;
  } finally {
    client.release();
  }
}
