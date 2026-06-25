import fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import prismaPlugin from './plugins/prisma';
import authPlugin from './plugins/auth';
import { registerRoutes } from './routes';

export async function buildApp(): Promise<FastifyInstance> {
  const app = fastify({
    logger: true
  });

  // Registro do CORS
  await app.register(cors, {
    origin: true
  });

  // Registro de Rate Limit
  await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute'
  });

  // Registro dos plugins locais
  await app.register(prismaPlugin);
  await app.register(authPlugin);

  // Registro das rotas
  await app.register(registerRoutes);

  // Tratamento de erros customizado
  app.setErrorHandler((error, request, reply) => {
    app.log.error(error);

    const statusCode = error.statusCode || 500;
    const errorCode = error.code || 'INTERNAL_SERVER_ERROR';

    reply.status(statusCode).send({
      success: false,
      error: {
        code: errorCode,
        message: error.message || 'Ocorreu um erro interno no servidor',
        statusCode
      }
    });
  });

  return app;
}
