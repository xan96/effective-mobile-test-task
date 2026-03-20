import jwt, { Secret } from 'jsonwebtoken';
import { config } from '../config';

export interface JwtPayload {
  userId: string;
  role: string;
}

export function generateToken(payload: JwtPayload): string {
  const secret: Secret = config.jwt.secret;
  return jwt.sign(payload, secret, {
    expiresIn: config.jwt.expiresIn,
  } as jwt.SignOptions);
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, config.jwt.secret) as JwtPayload;
}
