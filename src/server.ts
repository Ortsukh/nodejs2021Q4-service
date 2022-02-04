import  config  from './common/config';
import fastify from './app';
import { DBConnect } from './db';

const PORT =  config.PORT ?? 4000;

const start = async () => {
  await DBConnect();
  try {
    await fastify.listen(PORT, '0.0.0.0');
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();