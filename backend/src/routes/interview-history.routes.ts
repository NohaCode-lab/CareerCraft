import { FastifyInstance } from 'fastify';
import { interviewRepository, FullInterviewSessionData } from '../repositories/interview.repository.js';
import { ValidationError, NotFoundError } from '../errors/app-error.js';

export async function interviewHistoryRoutes(fastify: FastifyInstance) {
  fastify.get('/interview/history', async (request, reply) => {
    const userId = (request.query as { userId?: string })?.userId || 'usr_demo_01';
    const history = await interviewRepository.getUserInterviewHistory(userId);
    return reply.status(200).send({ success: true, data: { history }, meta: { requestId: request.id } });
  });

  fastify.get('/interview/session/:id', async (request, reply) => {
    const { id } = request.params as { id: string };
    const sessionDetails = await interviewRepository.getSessionById(id);
    if (!sessionDetails) {
      throw new NotFoundError(`Interview session with ID ${id} not found.`);
    }

    return reply.status(200).send({ success: true, data: sessionDetails, meta: { requestId: request.id } });
  });

  fastify.post('/interview/session/save', async (request, reply) => {
    const body = request.body as FullInterviewSessionData;
    if (!body?.session?.id || !body?.session?.userId) {
      throw new ValidationError('session object with id and userId is required.');
    }

    const saved = await interviewRepository.saveSession(body);
    return reply.status(200).send({ success: true, data: { session: saved }, meta: { requestId: request.id } });
  });
}
