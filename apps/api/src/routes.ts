import { FastifyInstance } from 'fastify';
import { healthRoutes } from './modules/health/health.routes';
import { authRoutes } from './modules/auth/auth.routes';
import { usersRoutes } from './modules/users/users.routes';
import { profilesRoutes } from './modules/profiles/profiles.routes';
import { contentRoutes } from './modules/content/content.routes';
import { billingRoutes } from './modules/billing/billing.routes';
import { analyticsRoutes } from './modules/analytics/analytics.routes';
import { adminRoutes } from './modules/admin/admin.routes';

export async function registerRoutes(fastify: FastifyInstance) {
  // Registro das rotas centrais do app
  fastify.register(healthRoutes);

  // Registro das rotas com o prefixo da API /api/v1
  await fastify.register(async (api) => {
    api.register(authRoutes, { prefix: '/auth' });
    api.register(usersRoutes, { prefix: '/users' });
    api.register(profilesRoutes, { prefix: '/profiles' });
    api.register(contentRoutes, { prefix: '/content' });
    api.register(billingRoutes, { prefix: '/billing' });
    api.register(analyticsRoutes, { prefix: '/analytics' });
    api.register(adminRoutes, { prefix: '/admin' });
  }, { prefix: '/api/v1' });
}
