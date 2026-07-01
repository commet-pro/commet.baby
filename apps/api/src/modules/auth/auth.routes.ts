import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { FastifyInstance, FastifyReply } from 'fastify';
import bcrypt from 'bcrypt';
import { LoginInputSchema, RegisterInputSchema } from '@commet/shared';
import { z } from 'zod';

const refreshInputSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token é obrigatório'),
});

const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function tokenHash(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

function publicRole(role: 'USER' | 'ADMIN'): 'PARENT' | 'ADMIN' {
  return role === 'ADMIN' ? 'ADMIN' : 'PARENT';
}

function sendError(reply: FastifyReply, statusCode: number, code: string, message: string) {
  return reply.status(statusCode).send({
    success: false,
    error: { code, message, statusCode },
  });
}

export async function authRoutes(fastify: FastifyInstance) {
  async function createSession(user: { id: string; email: string; role: 'USER' | 'ADMIN' }) {
    const role = publicRole(user.role);
    const accessToken = fastify.jwt.sign(
      { id: user.id, email: user.email, role, jti: randomUUID() },
      { expiresIn: 15 * 60 },
    );
    const refreshToken = randomBytes(48).toString('base64url');
    const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_MS);

    await fastify.prisma.session.create({
      data: {
        userId: user.id,
        token: tokenHash(accessToken),
        refreshToken: tokenHash(refreshToken),
        expiresAt,
      },
    });

    return { accessToken, refreshToken };
  }

  fastify.post('/register', async (request, reply) => {
    const parsed = RegisterInputSchema.safeParse(request.body);
    if (!parsed.success) {
      return sendError(
        reply,
        400,
        'VALIDATION_ERROR',
        parsed.error.issues[0]?.message ?? 'Dados inválidos',
      );
    }

    const email = parsed.data.email.trim().toLowerCase();
    const existingUser = await fastify.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return sendError(reply, 409, 'AUTH_EMAIL_IN_USE', 'Este e-mail já está cadastrado');
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 12);
    const user = await fastify.prisma.user.create({
      data: { email, name: parsed.data.name.trim(), passwordHash },
    });
    const session = await createSession(user);

    return reply.status(201).send({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: publicRole(user.role),
        },
        ...session,
      },
    });
  });

  fastify.post('/login', async (request, reply) => {
    const parsed = LoginInputSchema.safeParse(request.body);
    if (!parsed.success) {
      return sendError(
        reply,
        400,
        'VALIDATION_ERROR',
        parsed.error.issues[0]?.message ?? 'Dados inválidos',
      );
    }

    const email = parsed.data.email.trim().toLowerCase();
    const user = await fastify.prisma.user.findUnique({ where: { email } });
    const passwordMatches = user
      ? await bcrypt.compare(parsed.data.password, user.passwordHash)
      : false;

    if (!user || !passwordMatches) {
      return sendError(reply, 401, 'AUTH_INVALID_CREDENTIALS', 'E-mail ou senha inválidos');
    }

    const session = await createSession(user);
    return {
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: publicRole(user.role),
        },
        ...session,
      },
    };
  });

  fastify.post('/logout', { preHandler: fastify.authenticate }, async (request) => {
    const authorization = request.headers.authorization;
    const accessToken = authorization?.startsWith('Bearer ')
      ? authorization.slice('Bearer '.length)
      : null;

    if (accessToken) {
      await fastify.prisma.session.updateMany({
        where: { token: tokenHash(accessToken), revokedAt: null },
        data: { revokedAt: new Date() },
      });
    }

    return { success: true, data: null };
  });

  fastify.post('/refresh', async (request, reply) => {
    const parsed = refreshInputSchema.safeParse(request.body);
    if (!parsed.success) {
      return sendError(reply, 400, 'VALIDATION_ERROR', 'Refresh token é obrigatório');
    }

    const session = await fastify.prisma.session.findUnique({
      where: { refreshToken: tokenHash(parsed.data.refreshToken) },
      include: { user: true },
    });

    if (!session || session.revokedAt || session.expiresAt <= new Date()) {
      return sendError(reply, 401, 'AUTH_INVALID_REFRESH_TOKEN', 'Refresh token inválido');
    }

    await fastify.prisma.session.update({
      where: { id: session.id },
      data: { revokedAt: new Date() },
    });
    const newSession = await createSession(session.user);

    return {
      success: true,
      data: newSession,
    };
  });

  fastify.post('/forgot-password', async () => ({
    success: true,
    message: 'Se o e-mail existir, as instruções serão enviadas.',
  }));

  fastify.post('/reset-password', async (_request, reply) =>
    sendError(reply, 501, 'NOT_IMPLEMENTED', 'Redefinição de senha ainda não implementada'),
  );

  fastify.get('/verify-email/:token', async () => ({
    success: true,
    message: 'Verificação de e-mail não é obrigatória no ambiente atual.',
  }));
}
