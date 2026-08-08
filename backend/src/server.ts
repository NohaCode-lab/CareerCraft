import { loadConfig } from './app/config.js';
import { buildApp } from './app/app.js';

const config = loadConfig();
const app = buildApp(config);

const start = async () => {
  try {
    await app.listen({ port: config.PORT, host: config.HOST });
    app.log.info(`🚀 CareerCraft Backend BFF running on http://${config.HOST}:${config.PORT}`);
  } catch (err) {
    app.log.error(err, 'Failed to start server');
    process.exit(1);
  }
};

const shutdown = async (signal: string) => {
  app.log.info(`Received ${signal}. Shutting down gracefully...`);
  try {
    await app.close();
    app.log.info('Server closed successfully.');
    process.exit(0);
  } catch (err) {
    app.log.error(err, 'Error during graceful shutdown');
    process.exit(1);
  }
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

start();
