import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { TABLE_SUFFIX } from '../constants/constants';

dotenv.config();

const tableSuffix: string = process.env.TABLE_SUFFIX || TABLE_SUFFIX;

@Table({
  timestamps: true,
  tableName: `${tableSuffix}_users`,
  modelName: "User",
})

class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare firstname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare lastname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare role: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  @BeforeCreate
  static async hashPassword(instance: User): Promise<void> {
    if (instance.password) {
      const saltRounds = 10;
      try {
        const hashedPassword = await bcrypt.hash(instance.password, saltRounds);
        instance.password = hashedPassword;
      } catch (error:any) {
        throw new Error(`Error hashing password: ${error.message}`);
      }
    }
  }

  @BeforeUpdate
  static async updatePassword(instance: User): Promise<void> {
    if (instance.changed('password') && instance.password !== null) {
      const saltRounds = 10;
      try {
        const hashedPassword = await bcrypt.hash(instance.password, saltRounds);
        instance.password = hashedPassword;
      } catch (error:any) {
        throw new Error(`Error hashing password during update: ${error.message}`);
      }
    }
  }
}

export default User;
