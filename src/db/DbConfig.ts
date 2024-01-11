import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { Dialect } from 'sequelize';
import User from '../models/user';

dotenv.config();

const {
  DB_TYPE,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
} = process.env;
export const dialectMapping: Record<string, Dialect> = {
  mssql: 'mssql',
  mysql: 'mysql',
  postgres: 'postgres',
};
const dialect = dialectMapping[ DB_TYPE || 'postgres'] as Dialect;

const sequelize = new Sequelize({
  database: DB_NAME,
  dialect,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT ? parseInt(DB_PORT, 10) : undefined,
  models: [User],
});

export default sequelize;
