import { Connection, createConnection } from 'typeorm';
import 'reflect-metadata';
import addAdminConfig from './common/addAdmin';

let dbConnection: Connection | undefined;

const DBConnect = async (): Promise<void> => {
  try {
    if (!dbConnection) {
      console.log('Creating new DB connection...');
      dbConnection = await createConnection();
    }
    if (dbConnection && !dbConnection.isConnected) {
      await dbConnection.connect();
    }
    console.log('DB successfully Connected...');
    await dbConnection.runMigrations();
    console.log('Migrations completed...');
  
   

  } catch (e) {
    console.log(e);
    console.log('DB is not connected!');
    process.exit(1);
  }
  try{
     await addAdminConfig.addAdmin()
    console.log('Admin added');
    
  }catch(e){
    console.log('Admin is not added');
    
  }
};

export { DBConnect };