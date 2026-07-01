import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { FastifyReply, FastifyRequest } from 'fastify';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      id: string;
      email: string;
      role: 'PARENT' | 'ADMIN';
    };
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    requireAdmin: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

export default fp(async (fastify) => {
  await fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'fallback-secret-for-dev-only',
  });

  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.status(401).send({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Token de acesso inválido ou expirado',
          statusCode: 401,
        },
      });
    }
  });

  fastify.decorate('requireAdmin', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
      if (request.user.role !== 'ADMIN') {
        throw new Error('Forbidden');
      }
    } catch (err) {
      reply.status(403).send({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Você não tem permissão para acessar este recurso',
          statusCode: 403,
        },
      });
    }
  });
});
