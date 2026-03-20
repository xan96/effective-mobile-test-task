import { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from '../utils/errors';
import { UserRole } from '../entities/user.entity';

export function adminOnly(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  if (req.user?.role !== UserRole.ADMIN) {
    return next(new ForbiddenError('Admin access required'));
  }
  next();
}

export function adminOrSelf(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const targetUserId = req.params.id;
  const currentUserId = req.user?.userId;
  const currentUserRole = req.user?.role;

  if (currentUserRole === UserRole.ADMIN || currentUserId === targetUserId) {
    return next();
  }

  next(new ForbiddenError('Access denied'));
}
