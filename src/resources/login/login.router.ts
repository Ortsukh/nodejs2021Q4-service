import { FastifyPluginAsync } from 'fastify';
import loginService from './login.service';

interface Params {
  login: string;
  password: string;
}
const loginRouter: FastifyPluginAsync = async (router): Promise<void> => {
  router.post('/', async (request, response) => {
    const params = request.body as Params;
    try {
      const token = await loginService.login(params.login, params.password);
      response.code(200);
      response.send(token);
    } catch (error) {
      response.code(403).send('Forbiden');
    }
  });
};
export default loginRouter;
