import { FastifyInstance } from 'fastify';

export async function profilesRoutes(fastify: FastifyInstance) {
  // Rotas protegidas
  fastify.addHook('preHandler', fastify.authenticate);

  fastify.get('/', async (request, reply) => {
    return { success: true, data: [] };
  });

  fastify.post('/', async (request, reply) => {
    return { success: true, message: 'Create profile endpoint stub' };
  });

  fastify.get('/:id', async (request, reply) => {
    return { success: true, message: 'Get profile details endpoint stub' };
  });

  fastify.patch('/:id', async (request, reply) => {
    return { success: true, message: 'Update profile endpoint stub' };
  });

  fastify.delete('/:id', async (request, reply) => {
    return { success: true, message: 'Delete profile endpoint stub' };
  });

  fastify.get('/:id/progress', async (request, reply) => {
    return { success: true, message: 'Get profile progress endpoint stub' };
  });
}
