import { FastifyInstance } from 'fastify';

export async function billingRoutes(fastify: FastifyInstance) {
  // Rota pública para webhooks do Stripe (sem autenticação JWT)
  fastify.post('/webhooks/stripe', async (request, reply) => {
    return { success: true, message: 'Stripe webhook received' };
  });

  // Rota pública para listagem de planos
  fastify.get('/plans', async (request, reply) => {
    return { success: true, data: [] };
  });

  // Sub-grupo de rotas protegidas por JWT
  fastify.register(async (protectedRoutes) => {
    protectedRoutes.addHook('preHandler', fastify.authenticate);

    protectedRoutes.post('/checkout', async (request, reply) => {
      return {
        success: true,
        data: {
          checkoutUrl: 'https://checkout.stripe.com/pay_stub'
        }
      };
    });

    protectedRoutes.post('/portal', async (request, reply) => {
      return {
        success: true,
        data: {
          portalUrl: 'https://billing.stripe.com/portal_stub'
        }
      };
    });

    protectedRoutes.get('/subscription', async (request, reply) => {
      return { success: true, data: null };
    });

    protectedRoutes.post('/addon/bilingual', async (request, reply) => {
      return { success: true, message: 'Bilingual addon toggle stub' };
    });
  });
}
