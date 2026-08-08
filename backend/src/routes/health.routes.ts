import { FastifyInstance } from 'fastify';

export async function healthRoutes(fastify: FastifyInstance) {
  // Liveness check - returns 200 OK if service process is running
  fastify.get('/health', async (_request, reply) => {
    return reply.status(200).send({
      status: 'ok',
      service: 'careercraft-bff',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    });
  });

  // Readiness check - checks if dependencies & boundaries are operational
  fastify.get('/health/ready', async (_request, reply) => {
    return reply.status(200).send({
      status: 'ready',
      service: 'careercraft-bff',
      version: '1.0.0',
      checks: {
        api: 'healthy',
        database: 'deferred_phase_6',
        aiService: 'deferred_phase_4',
      },
      timestamp: new Date().toISOString(),
    });
  });
}
