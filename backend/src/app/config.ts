import { z } from 'zod';

export const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  HOST: z.string().default('127.0.0.1'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('info'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  RATE_LIMIT_MAX: z.coerce.number().default(100),
  
  // AI Gateway Configuration
  LITELLM_URL: z.string().default('http://127.0.0.1:4001'),
  LITELLM_MASTER_KEY: z.string().default('sk-careercraft-dev-key'),
  OPENROUTER_API_KEY: z.string().optional(),
  OLLAMA_URL: z.string().default('http://127.0.0.1:11434'),
  AI_MOCK_MODE: z.coerce.boolean().default(false),
});

export type AppConfig = z.infer<typeof configSchema>;

export const loadConfig = (env: Record<string, string | undefined> = process.env): AppConfig => {
  const result = configSchema.safeParse(env);
  if (!result.success) {
    console.error('❌ Invalid backend configuration:', result.error.format());
    throw new Error('Invalid backend configuration');
  }
  return result.data;
};
