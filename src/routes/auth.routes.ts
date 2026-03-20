import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validate } from '../middleware/validate.middleware';
import { authRateLimiter } from '../middleware/rateLimit.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { registerSchema, loginSchema } from '../dto/auth.dto';

const router = Router();

router.post('/register', authRateLimiter, validate(registerSchema), authController.register);
router.post('/login', authRateLimiter, validate(loginSchema), authController.login);
router.get('/me', authMiddleware, authController.me);

export default router;
