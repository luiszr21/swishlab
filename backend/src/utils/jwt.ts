import jwt, { SignOptions } from 'jsonwebtoken';

export interface AuthPayload {
  id: string;
  email: string;
}

export function generateToken(payload: AuthPayload): string {
  const expiresIn = process.env.JWT_EXPIRES_IN || '48h';
  const options: SignOptions & { expiresIn: string } = {
    expiresIn: expiresIn as any,
  };
  return jwt.sign(payload, process.env.JWT_SECRET || 'secret', options);
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret') as AuthPayload;
  } catch (error) {
    return null;
  }
}
