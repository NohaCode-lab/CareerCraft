import { FastifyInstance } from 'fastify';
import { AppConfig } from '../app/config.js';
import { healthRoutes } from './health.routes.js';
import { profileRoutes } from './profile.routes.js';
import { jobsRoutes } from './jobs.routes.js';
import { aiRoutes } from './ai.routes.js';
import { aiWorkflowRoutes } from './ai-workflow.routes.js';
import { interviewHistoryRoutes } from './interview-history.routes.js';

export async function apiV1Routes(fastify: FastifyInstance, options?: { config?: AppConfig }) {
  const childOpts = options?.config ? { config: options.config } : {};
  await fastify.register(healthRoutes);
  await fastify.register(profileRoutes);
  await fastify.register(jobsRoutes);
  await fastify.register(aiRoutes, childOpts);
  await fastify.register(aiWorkflowRoutes, childOpts);
  await fastify.register(interviewHistoryRoutes, childOpts);
}
