import { User } from '../entities/user.entity';
import { RegisterDto, LoginDto } from '../dto/auth.dto';
import { hashPassword, comparePassword } from '../utils/password.utils';
import { generateToken } from '../utils/jwt.utils';
import { ConflictError, UnauthorizedError } from '../utils/errors';

export async function register(dto: RegisterDto) {
  const existingUser = await User.findOne({ where: { email: dto.email } });

  if (existingUser) {
    throw new ConflictError('Email already registered');
  }

  const hashedPassword = await hashPassword(dto.password);

  const user = await User.create({
    fullName: dto.fullName,
    birthDate: dto.birthDate,
    email: dto.email,
    password: hashedPassword,
  });

  const { password: _, ...userWithoutPassword } = user.toJSON();
  return userWithoutPassword;
}

export async function login(dto: LoginDto) {
  const user = await User.findOne({ where: { email: dto.email } });

  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }

  if (!user.isActive) {
    throw new UnauthorizedError('Account is blocked');
  }

  const isPasswordValid = await comparePassword(dto.password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const accessToken = generateToken({
    userId: user.id,
    role: user.role,
  });

  const { password: _, ...userWithoutPassword } = user.toJSON();

  return {
    accessToken,
    user: userWithoutPassword,
  };
}
