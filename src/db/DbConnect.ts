import sequelize from "./DbConfig";

// Test the database connection
export async function dbConnection(): Promise<void> {

  try {
    await sequelize.authenticate();
    console.log('Database Connection has been established successfully.');
  } catch (error:any) {
    console.error('Unable to connect to the database:', error);
  }
}