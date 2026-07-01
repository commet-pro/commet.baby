import { FastifyInstance } from 'fastify';

export async function usersRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', fastify.authenticate);

  fastify.get('/me', async (request, reply) => {
    const user = await fastify.prisma.user.findUnique({
      where: { id: request.user.id },
      select: { id: true, email: true, name: true, role: true },
    });

    if (!user) {
      return reply.status(404).send({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'Usuário não encontrado',
          statusCode: 404,
        },
      });
    }

    return {
      success: true,
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role === 'ADMIN' ? 'ADMIN' : 'PARENT',
      },
    };
  });

  fastify.patch('/me', async (request, reply) => {
    return { success: true, message: 'User profile updated stub' };
  });

  fastify.delete('/me', async (request, reply) => {
    return { success: true, message: 'User profile deleted stub' };
  });
}
