import { FastifyInstance } from 'fastify';

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/register', async (request, reply) => {
    return { success: true, message: 'Register endpoint stub' };
  });

  fastify.post('/login', async (request, reply) => {
    return { success: true, message: 'Login endpoint stub' };
  });

  fastify.post('/logout', async (request, reply) => {
    return { success: true, message: 'Logout endpoint stub' };
  });

  fastify.post('/refresh', async (request, reply) => {
    return { success: true, message: 'Refresh token endpoint stub' };
  });

  fastify.post('/forgot-password', async (request, reply) => {
    return { success: true, message: 'Forgot password endpoint stub' };
  });

  fastify.post('/reset-password', async (request, reply) => {
    return { success: true, message: 'Reset password endpoint stub' };
  });

  fastify.get('/verify-email/:token', async (request, reply) => {
    return { success: true, message: 'Verify email endpoint stub' };
  });
}
