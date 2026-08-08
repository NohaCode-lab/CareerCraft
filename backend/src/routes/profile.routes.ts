import { FastifyInstance } from 'fastify';

export async function profileRoutes(fastify: FastifyInstance) {
  fastify.get('/profile', async (request, reply) => {
    return reply.status(200).send({
      success: true,
      data: {
        id: 'usr_demo_01',
        name: 'CareerCraft Demo Candidate',
        email: 'candidate@careercraft.io',
        role: 'Candidate',
        status: 'api_boundary_active',
      },
      meta: {
        requestId: request.id,
        persisted: false,
        note: 'PostgreSQL persistence is scheduled for future database phase.',
      },
    });
  });
}
