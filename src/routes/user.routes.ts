import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { adminOnly, adminOrSelf } from '../middleware/role.middleware';
import { validate } from '../middleware/validate.middleware';
import { userIdParamSchema } from '../dto/user.dto';

const router = Router();

router.use(authMiddleware);

router.get('/', adminOnly, userController.getAllUsers);

router.get(
  '/:id',
  validate(userIdParamSchema, 'params'),
  adminOrSelf,
  userController.getUserById
);

router.patch(
  '/:id/block',
  validate(userIdParamSchema, 'params'),
  adminOrSelf,
  userController.blockUser
);

export default router;
