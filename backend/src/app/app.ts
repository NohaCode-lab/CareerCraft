import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import sensible from '@fastify/sensible';
import { AppConfig } from './config.js';
import { apiV1Routes } from '../routes/index.js';
import { AppError } from '../errors/app-error.js';

let requestIdCounter = 0;

export function buildApp(config: AppConfig): FastifyInstance {
  const isDev = config.NODE_ENV === 'development';

  const fastify = Fastify({
    logger: {
      level: config.LOG_LEVEL,
      ...(isDev
        ? {
            transport: {
              target: 'pino-pretty',
              options: { colorize: true, translateTime: 'HH:MM:ss Z', ignore: 'pid,hostname' },
            },
          }
        : {}),
    },
    genReqId: () => {
      requestIdCounter += 1;
      return `req_${Date.now()}_${requestIdCounter}`;
    },
    requestIdHeader: 'x-request-id',
    bodyLimit: 2 * 1024 * 1024, // 2MB request limit
  });

  // Security Plugins
  fastify.register(cors, {
    origin: config.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  fastify.register(helmet, {
    contentSecurityPolicy: isDev ? false : undefined,
  });

  fastify.register(rateLimit, {
    max: config.RATE_LIMIT_MAX,
    timeWindow: '1 minute',
  });

  fastify.register(sensible);

  // Register API v1 routes
  fastify.register(apiV1Routes, { prefix: '/api/v1' });

  // Centralized Error Handler
  fastify.setErrorHandler((error: Error & { statusCode?: number; validation?: unknown; code?: string }, request, reply) => {
    const requestId = request.id;

    if (error instanceof AppError) {
      request.log.warn({ requestId, err: error }, error.message);
      return reply.status(error.statusCode).send({
        error: {
          code: error.code,
          message: error.message,
          requestId,
          ...(error.details ? { details: error.details } : {}),
        },
      });
    }

    // Fastify validation errors
    if ('validation' in error && error.validation) {
      return reply.status(400).send({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid request parameter or payload',
          requestId,
          details: error.validation,
        },
      });
    }

    // Unexpected internal server errors (sanitize in production)
    request.log.error({ requestId, err: error }, 'Unhandled server error');

    const statusCode = typeof error.statusCode === 'number' ? error.statusCode : 500;
    const errorMessage = isDev ? error.message : 'An internal server error occurred';

    return reply.status(statusCode).send({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: errorMessage,
        requestId,
      },
    });
  });

  return fastify;
}
