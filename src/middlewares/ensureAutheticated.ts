// Esse middleware vai evitar usuarios nao autenticados acesse uma determinada rota da aplicação

import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import configAuth from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}
export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT token is missing');
  }
  const { secret } = configAuth.jwt;
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, secret);
    const { sub } = decoded as TokenPayload; // Forma de fazer a tipagem de uma varialve "(varialve ) as TokenPayload"

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
}
