import rateLimit from 'express-rate-limit';
import { config } from '../config';

export const authRateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  limit: config.rateLimit.max,
  message: {
    status: 'error',
    message: 'Too many attempts, please try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
