import { FastifyInstance } from 'fastify';
import { loadConfig, AppConfig } from '../app/config.js';
import { AIGatewayService } from '../services/ai-gateway.service.js';
import { chatCompletionRequestSchema } from '../schemas/ai.schema.js';
import { ValidationError } from '../errors/app-error.js';

export async function aiRoutes(fastify: FastifyInstance, options?: { config?: AppConfig }) {
  const config = options?.config || loadConfig();
  const aiGatewayService = new AIGatewayService(config);

  fastify.post('/ai/chat', async (request, reply) => {
    const parseResult = chatCompletionRequestSchema.safeParse(request.body);

    if (!parseResult.success) {
      throw new ValidationError('Invalid AI request payload', parseResult.error.format());
    }

    const aiRequest = parseResult.data;
    const clientRequestId = request.id;

    request.log.info(
      { requestId: clientRequestId, task: aiRequest.task, modelAlias: aiRequest.modelAlias },
      'Forwarding AI chat completion request to AI Gateway'
    );

    const result = await aiGatewayService.executeChatCompletion(aiRequest, clientRequestId);

    return reply.status(200).send({
      success: true,
      data: result,
    });
  });
}
