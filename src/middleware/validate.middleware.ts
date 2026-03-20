import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError, ZodIssue } from 'zod';
import { BadRequestError } from '../utils/errors';

type ValidationTarget = 'body' | 'params' | 'query';

export function validate(schema: ZodSchema, target: ValidationTarget = 'body') {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      const data = req[target];
      const parsed = schema.parse(data);
      req[target] = parsed;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const messages = error.issues.map((e: ZodIssue) => e.message).join(', ');
        next(new BadRequestError(messages));
      } else {
        next(error);
      }
    }
  };
}
