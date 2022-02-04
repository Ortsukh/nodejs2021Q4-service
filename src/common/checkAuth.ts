import { FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import ApiError from '../resources/errors/api-error';
import config from './config';

const checkJWT = async (req: FastifyRequest) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    throw new ApiError(401, `Unauthorized`);
  }
  if (
    !(
      authorizationHeader &&
      authorizationHeader.split(' ') &&
      authorizationHeader.split(' ')[0] === 'Bearer' &&
      authorizationHeader.split(' ')[1]
    )
  ) {
    throw new ApiError(401, `Unauthorized`);
  }
  const accessToken = authorizationHeader.split(' ')[1];
  if (!accessToken) {
    throw new ApiError(401, `Unauthorized`);
  }
  const validateAccessToken = (token: string) => {
    try {
      const userData = jwt.verify(token, config.JWT_SECRET_KEY!);
      return userData;
    } catch (e) {
      return null;
    }
  };
  const userData = validateAccessToken(accessToken);
  if (!userData) {
    throw new ApiError(401, `Unauthorized`);
  }
  return false;
};

export default checkJWT;
