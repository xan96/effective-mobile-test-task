import { User, UserRole } from '../entities/user.entity';
import { NotFoundError, ForbiddenError } from '../utils/errors';

export async function getAllUsers() {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
    order: [['createdAt', 'DESC']],
  });

  return { users, total: users.length };
}

export async function getUserById(id: string) {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  return user;
}

export async function blockUser(id: string) {
  const user = await User.findByPk(id);

  if (!user) {
    throw new NotFoundError('User not found');
  }

  if (user.role === UserRole.ADMIN) {
    throw new ForbiddenError('Cannot block admin user');
  }

  user.isActive = false;
  await user.save();

  const { password: _, ...userWithoutPassword } = user.toJSON();
  return userWithoutPassword;
}
