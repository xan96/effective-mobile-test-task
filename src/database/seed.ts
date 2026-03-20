import { initDatabase } from './index';
import { User, UserRole } from '../entities/user.entity';
import { hashPassword } from '../utils/password.utils';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

async function seed() {
  try {
    await initDatabase();
    console.log('Database connected');

    const adminExists = await User.findOne({ where: { email: ADMIN_EMAIL } });

    if (adminExists) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const hashedPassword = await hashPassword(ADMIN_PASSWORD);

    await User.create({
      fullName: 'Admin User',
      birthDate: '1990-01-01',
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: UserRole.ADMIN,
      isActive: true,
    });

    console.log('Admin user created successfully');
    console.log(`  Email: ${ADMIN_EMAIL}`);

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();
