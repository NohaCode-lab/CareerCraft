import { FastifyInstance } from 'fastify';
import { loadConfig } from '../app/config.js';
import { AIWorkflowService } from '../services/ai-workflow.service.js';
import { telemetryService } from '../services/telemetry.service.js';
import { ValidationError } from '../errors/app-error.js';
import {
  generateInterviewQuestionsSchema,
  generatePersonalizedAnswerSchema,
  evaluateInterviewAnswerSchema
} from '../schemas/ai.schema.js';

export async function aiWorkflowRoutes(fastify: FastifyInstance) {
  const config = loadConfig();
  const workflowService = new AIWorkflowService(config);

  fastify.post('/ai/workflows/resume/optimize', async (request, reply) => {
    const body = request.body as { input_resume?: string; job_description?: string };
    if (!body?.input_resume || !body?.job_description) {
      throw new ValidationError('input_resume and job_description are required.');
    }

    const result = await workflowService.optimizeResume(
      { input_resume: body.input_resume, job_description: body.job_description },
      request.id
    );

    return reply.status(200).send(result);
  });

  fastify.post('/ai/workflows/job/analyze', async (request, reply) => {
    const body = request.body as { job_description?: string };
    if (!body?.job_description) {
      throw new ValidationError('job_description is required.');
    }

    const result = await workflowService.analyzeJob({ job_description: body.job_description }, request.id);
    return reply.status(200).send(result);
  });

  fastify.post('/ai/workflows/career/plan', async (request, reply) => {
    const body = request.body as { candidate_profile?: string; target_role?: string };
    if (!body?.candidate_profile || !body?.target_role) {
      throw new ValidationError('candidate_profile and target_role are required.');
    }

    const result = await workflowService.planCareer(
      { candidate_profile: body.candidate_profile, target_role: body.target_role },
      request.id
    );

    return reply.status(200).send(result);
  });

  fastify.post('/ai/interview/questions', async (request, reply) => {
    const parseResult = generateInterviewQuestionsSchema.safeParse(request.body);
    if (!parseResult.success) {
      throw new ValidationError(parseResult.error.errors[0]?.message || 'Invalid interview questions payload');
    }

    const result = await workflowService.generateInterviewQuestions(
      {
        resume_text: parseResult.data.resumeText,
        job_description: parseResult.data.jobDescription,
        category: parseResult.data.category,
        question_count: parseResult.data.questionCount,
      },
      request.id
    );

    return reply.status(200).send(result);
  });

  fastify.post('/ai/interview/answer', async (request, reply) => {
    const parseResult = generatePersonalizedAnswerSchema.safeParse(request.body);
    if (!parseResult.success) {
      throw new ValidationError(parseResult.error.errors[0]?.message || 'Invalid answer request payload');
    }

    const result = await workflowService.generatePersonalizedAnswer(
      {
        resume_text: parseResult.data.resumeText,
        question_text: parseResult.data.questionText,
      },
      request.id
    );

    return reply.status(200).send(result);
  });

  fastify.post('/ai/interview/evaluate', async (request, reply) => {
    const parseResult = evaluateInterviewAnswerSchema.safeParse(request.body);
    if (!parseResult.success) {
      throw new ValidationError(parseResult.error.errors[0]?.message || 'Invalid evaluation request payload');
    }

    const result = await workflowService.evaluateInterviewAnswer(
      {
        question_text: parseResult.data.questionText,
        user_answer: parseResult.data.userAnswer,
      },
      request.id
    );

    return reply.status(200).send(result);
  });

  fastify.post('/ai/evaluation/benchmark', async (request, reply) => {
    const result = await workflowService.runAIEvaluationBenchmark(request.id);
    return reply.status(200).send(result);
  });

  fastify.get('/telemetry/traces', async (request, reply) => {
    const report = telemetryService.getTelemetryReport();
    return reply.status(200).send({ success: true, data: report, meta: { requestId: request.id } });
  });
}
