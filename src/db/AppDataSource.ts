import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Group } from './entity/Group.entity';
import { Student } from './entity/Student.entity';

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB ?? 'C:/Users/mclie/StudentsVKITest/db/vki-web.db', // Path to your SQLite database file
  entities: [Group, Student],
  synchronize: false, // Auto-create schema on startup (use with caution in production)
  logging: false,
});

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
// const init = async (): Promise<void> => {
//   try {
//     await AppDataSource.initialize();
//   }
//   catch (error) {
//     console.log(error);
//   }
// };

// init();
export const initializeDataSource = async (): Promise<void> => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log('✅ Data Source has been initialized!');
  }
};

export default AppDataSource;
