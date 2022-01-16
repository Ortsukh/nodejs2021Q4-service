import { Connection, createConnection } from 'typeorm';
import 'reflect-metadata';
import ormConfig from './common/orm-config';

let dbConnection: Connection | undefined;

const DBConnect = async (): Promise<void> => {
  try {
    if (!dbConnection) {
      console.info('Creating new DB connection...');
      dbConnection = await createConnection(ormConfig);
    }
    if (dbConnection && !dbConnection.isConnected) {
      console.info('Connecting to DB...');
      await dbConnection.connect();
    }
    console.info('DB successfully Connected...');
    await dbConnection.runMigrations();
    console.info('Migrations completed...');
  } catch (e) {
    console.error(e);
    console.error('DB is not connected!');
    process.exit(1);
  }
};

export { DBConnect };