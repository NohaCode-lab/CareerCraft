import { FastifyInstance } from 'fastify';

export async function jobsRoutes(fastify: FastifyInstance) {
  fastify.get('/jobs', async (request, reply) => {
    return reply.status(200).send({
      success: true,
      data: [
        {
          id: 'job_01',
          title: 'Senior Frontend Engineer (React/TypeScript)',
          company: 'CareerCraft Systems',
          location: 'Remote',
          type: 'Full-time',
        },
      ],
      meta: {
        requestId: request.id,
        count: 1,
        note: 'Backend job search API contract boundary active.',
      },
    });
  });
}
