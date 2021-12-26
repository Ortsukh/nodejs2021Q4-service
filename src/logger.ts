import { FastifyInstance} from 'fastify';
import fs from 'fs';
import path from 'path';
import config from './common/config';


const logFilePath = path.resolve(__dirname, config.COMMON_LOG_FILE);
const errorLogFilePath = path.resolve(__dirname, config.ERROR_LOG_FILE);

/**
 * Returns current date and time in string
 * @returns time and date
 */
const getDate = (): string => new Date().toLocaleString();

/**
 * Adds a cusom logger to the Fastify instance
 * @param fastify Fastify Instance
 * @returns void (Promise)
 */
const logger = async (
  fastify: FastifyInstance
) => {
    const errorFileWriteStream = fs.createWriteStream(errorLogFilePath,{
        flags: 'a'
    });
    const logFileWriteStream = fs.createWriteStream(logFilePath,{
        flags: 'a'
    });
  process.on('uncaughtException', (e) => {
    const errorMessage = `ERROR: ${getDate()} ${e.message}\n`;

    errorFileWriteStream.write(errorMessage, () => {
      console.log(errorMessage); // eslint-disable-line no-console
      process.exit(1);
    });
  });

  process.on('unhandledRejection', (e) => {
    const errorMessage = `ERROR: ${getDate()} ${(e as Error).message}\n`;

    errorFileWriteStream.write(errorMessage, () => {
      console.log(errorMessage); // eslint-disable-line no-console
      process.exit(1);
    });
  });
  fastify.addHook('onSend', async (req, reply) => {
   
      const string = `Date: ${getDate()}, req.url: ${req.url}, req.body:${req.body}, req.query: ${JSON.stringify(req.query)}, reply.statusCode:${reply.statusCode} \n`
      await logFileWriteStream.write(string, () => {
        console.log(string); // eslint-disable-line no-console
      });
    
    });
  
};

export default logger;