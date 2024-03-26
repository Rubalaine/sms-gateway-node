import 'dotenv/config.js';
import { app } from './app.js';
import { loadAndStartConfig } from './utils/config-utils.js';

await loadAndStartConfig();

try {
    await app.listen({ port: 3000, host: '0.0.0.0' })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }