import { FastifyInstance } from 'fastify';

export async function usersRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', fastify.authenticate);

  fastify.get('/me', async (request, reply) => {
    return {
      success: true,
      data: {
        id: request.user.id,
        email: request.user.email
      }
    };
  });

  fastify.patch('/me', async (request, reply) => {
    return { success: true, message: 'User profile updated stub' };
  });

  fastify.delete('/me', async (request, reply) => {
    return { success: true, message: 'User profile deleted stub' };
  });
}
