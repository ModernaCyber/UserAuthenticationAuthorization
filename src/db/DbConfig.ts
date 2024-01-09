import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { Dialect } from 'sequelize';
import User from '../models/user';

dotenv.config();

// Define types for your environment variables
interface DatabaseEnv {
  DATABASE_TYPE: string;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: string;
}

// Access your environment variables and assert their type
const {
  DATABASE_TYPE,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
} = process.env;

const dbConfigObject = {
  database: DB_NAME,
  dialect: DATABASE_TYPE as Dialect, 
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT ? parseInt(DB_PORT, 10) : undefined, 
};

// Instantiate Sequelize with your configuration
const sequelize = new Sequelize({
  ...dbConfigObject,
  models: [User]
});

export default sequelize;
