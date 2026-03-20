import { Sequelize } from 'sequelize-typescript';
import { config } from '../config';
import { User } from '../entities/user.entity';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.user,
  password: config.database.password,
  database: config.database.name,
  logging: false,
  models: [User],
});

export async function initDatabase() {
  await sequelize.authenticate();
  await sequelize.sync({ alter: config.nodeEnv === 'development' });
}
