import { FastifyInstance, FastifyReply } from 'fastify';
import { CreateBabyProfileInputSchema, UpdateBabyProfileInputSchema } from '@commet/shared';

function sendError(reply: FastifyReply, statusCode: number, code: string, message: string) {
  return reply.status(statusCode).send({
    success: false,
    error: { code, message, statusCode },
  });
}

function serializeProfile(profile: {
  id: string;
  name: string;
  birthDate: Date;
  avatarId: string;
  languagePref: 'PT_BR' | 'EN';
}) {
  return {
    id: profile.id,
    name: profile.name,
    birthDate: profile.birthDate.toISOString().slice(0, 10),
    avatarId: profile.avatarId,
    languagePref: profile.languagePref,
  };
}

export async function profilesRoutes(fastify: FastifyInstance) {
  fastify.addHook('preHandler', fastify.authenticate);

  fastify.get('/', async (request) => {
    const profiles = await fastify.prisma.babyProfile.findMany({
      where: { userId: request.user.id },
      orderBy: { createdAt: 'asc' },
    });
    return { success: true, data: profiles.map(serializeProfile) };
  });

  fastify.post('/', async (request, reply) => {
    const parsed = CreateBabyProfileInputSchema.safeParse(request.body);
    if (!parsed.success) {
      return sendError(
        reply,
        400,
        'VALIDATION_ERROR',
        parsed.error.issues[0]?.message ?? 'Dados inválidos',
      );
    }

    const profile = await fastify.prisma.babyProfile.create({
      data: {
        userId: request.user.id,
        name: parsed.data.name.trim(),
        birthDate: new Date(`${parsed.data.birthDate}T00:00:00.000Z`),
        avatarId: parsed.data.avatarId,
        languagePref: parsed.data.languagePref,
      },
    });
    return reply.status(201).send({ success: true, data: serializeProfile(profile) });
  });

  fastify.get<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const profile = await fastify.prisma.babyProfile.findFirst({
      where: { id: request.params.id, userId: request.user.id },
    });
    if (!profile) {
      return sendError(reply, 404, 'PROFILE_NOT_FOUND', 'Perfil não encontrado');
    }
    return { success: true, data: serializeProfile(profile) };
  });

  fastify.patch<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const parsed = UpdateBabyProfileInputSchema.safeParse(request.body);
    if (!parsed.success) {
      return sendError(
        reply,
        400,
        'VALIDATION_ERROR',
        parsed.error.issues[0]?.message ?? 'Dados inválidos',
      );
    }

    const existing = await fastify.prisma.babyProfile.findFirst({
      where: { id: request.params.id, userId: request.user.id },
    });
    if (!existing) {
      return sendError(reply, 404, 'PROFILE_NOT_FOUND', 'Perfil não encontrado');
    }

    const profile = await fastify.prisma.babyProfile.update({
      where: { id: existing.id },
      data: {
        ...(parsed.data.name !== undefined && { name: parsed.data.name.trim() }),
        ...(parsed.data.birthDate !== undefined && {
          birthDate: new Date(`${parsed.data.birthDate}T00:00:00.000Z`),
        }),
        ...(parsed.data.avatarId !== undefined && { avatarId: parsed.data.avatarId }),
        ...(parsed.data.languagePref !== undefined && {
          languagePref: parsed.data.languagePref,
        }),
      },
    });
    return { success: true, data: serializeProfile(profile) };
  });

  fastify.delete<{ Params: { id: string } }>('/:id', async (request, reply) => {
    const existing = await fastify.prisma.babyProfile.findFirst({
      where: { id: request.params.id, userId: request.user.id },
    });
    if (!existing) {
      return sendError(reply, 404, 'PROFILE_NOT_FOUND', 'Perfil não encontrado');
    }

    await fastify.prisma.babyProfile.delete({ where: { id: existing.id } });
    return { success: true, data: null };
  });

  fastify.get<{ Params: { id: string } }>('/:id/progress', async (request, reply) => {
    const existing = await fastify.prisma.babyProfile.findFirst({
      where: { id: request.params.id, userId: request.user.id },
    });
    if (!existing) {
      return sendError(reply, 404, 'PROFILE_NOT_FOUND', 'Perfil não encontrado');
    }

    const progress = await fastify.prisma.learningGoalProgress.findMany({
      where: { profileId: existing.id },
      include: { learningGoal: true },
    });
    return { success: true, data: progress };
  });
}
