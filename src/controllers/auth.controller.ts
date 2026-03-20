import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import * as userService from '../services/user.service';
import { RegisterDto, LoginDto } from '../dto/auth.dto';

export async function register(
  req: Request<{}, {}, RegisterDto>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request<{}, {}, LoginDto>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function me(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = await userService.getUserById(req.user!.userId);
    res.json(user);
  } catch (error) {
    next(error);
  }
}
