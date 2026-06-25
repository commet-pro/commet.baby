import fp from 'fastify-plugin';
import { prisma, PrismaClient } from '@commet/database';

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient;
  }
}

export default fp(async (fastify) => {
  fastify.decorate('prisma', prisma);
  
  fastify.addHook('onClose', async (server) => {
    await server.prisma.$disconnect();
  });
});
