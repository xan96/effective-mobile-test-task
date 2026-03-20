import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';

export async function getAllUsers(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await userService.getAllUsers();
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function getUserById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function blockUser(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const user = await userService.blockUser(req.params.id);
    res.json({
      ...user,
      message: 'User has been blocked',
    });
  } catch (error) {
    next(error);
  }
}
