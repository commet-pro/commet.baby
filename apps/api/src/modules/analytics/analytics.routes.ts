import { FastifyInstance } from 'fastify';

export async function analyticsRoutes(fastify: FastifyInstance) {
  // Rotas protegidas
  fastify.addHook('preHandler', fastify.authenticate);

  fastify.get('/usage', async (request, reply) => {
    return { success: true, data: { usageSeconds: 0 } };
  });

  fastify.get('/goals', async (request, reply) => {
    return { success: true, data: [] };
  });
}
