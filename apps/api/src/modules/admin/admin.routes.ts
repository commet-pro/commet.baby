import { FastifyInstance } from 'fastify';

export async function adminRoutes(fastify: FastifyInstance) {
  // Todas as rotas de admin exigem role ADMIN
  fastify.addHook('preHandler', fastify.requireAdmin);

  fastify.get('/content', async (request, reply) => {
    return { success: true, data: [] };
  });

  fastify.post('/content', async (request, reply) => {
    return { success: true, message: 'Content created' };
  });

  fastify.patch('/content/:id', async (request, reply) => {
    return { success: true, message: 'Content updated' };
  });

  fastify.delete('/content/:id', async (request, reply) => {
    return { success: true, message: 'Content deleted' };
  });

  fastify.post('/content/:id/publish', async (request, reply) => {
    return { success: true, message: 'Content published' };
  });

  fastify.get('/users', async (request, reply) => {
    return { success: true, data: [] };
  });

  fastify.get('/dashboard', async (request, reply) => {
    return { success: true, data: {} };
  });

  fastify.post('/upload', async (request, reply) => {
    return { success: true, data: { url: 'https://s3.commet.baby/stub' } };
  });
}
