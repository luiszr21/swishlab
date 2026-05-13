import jwt from 'jsonwebtoken';

export interface AuthPayload {
  id: string;
  email: string;
}

export function generateToken(payload: AuthPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET || 'secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '48h',
  });
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret') as AuthPayload;
  } catch (error) {
    return null;
  }
}
