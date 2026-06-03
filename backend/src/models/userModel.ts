import pool from '../database/connection';

export interface UserRecord {
  id: string;
  email: string;
  username: string | null;
  preferred_position: string | null;
  created_at: string;
  updated_at: string;
}

interface CreateUserInput {
  email: string;
  username: string;
  passwordHash: string;
}

interface UpdateUserInput {
  username?: string | null;
  preferredPosition?: string | null;
}

export async function createUser(input: CreateUserInput): Promise<UserRecord> {
  const result = await pool.query(
    'INSERT INTO users (email, username, password_hash) VALUES ($1, $2, $3) RETURNING id, email, username, preferred_position, created_at, updated_at',
    [input.email.toLowerCase(), input.username, input.passwordHash]
  );

  return result.rows[0];
}

export async function findUserByEmail(email: string): Promise<(UserRecord & { password_hash: string }) | null> {
  const result = await pool.query(
    'SELECT id, email, username, preferred_position, created_at, updated_at, password_hash FROM users WHERE email = $1',
    [email.toLowerCase()]
  );

  return result.rows[0] ?? null;
}

export async function findUserById(id: string): Promise<UserRecord | null> {
  const result = await pool.query(
    'SELECT id, email, username, preferred_position, created_at, updated_at FROM users WHERE id = $1',
    [id]
  );

  return result.rows[0] ?? null;
}

export async function updateUserProfile(id: string, input: UpdateUserInput): Promise<UserRecord | null> {
  const result = await pool.query(
    `UPDATE users
     SET username = COALESCE($1, username),
         preferred_position = COALESCE($2, preferred_position),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $3
     RETURNING id, email, username, preferred_position, created_at, updated_at`,
    [input.username ?? null, input.preferredPosition ?? null, id]
  );

  return result.rows[0] ?? null;
}