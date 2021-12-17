import  config  from './common/config';
import fastify from './app';

const PORT =  config.PORT ?? 4000;

const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();