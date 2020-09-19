import { json } from 'body-parser';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';

import appConfig from '~/config/app';
import logger from '~/logger';

import { logging } from './middlewares';
import routes from './routes';
import ssr from './ssr';

export default async function createServer() {
  await ssr.prepare();

  const app = express();

  app.use(json());
  app.use(logging);
  app.use(helmet());
  app.use(compression());
  app.use(routes);

  app.listen(appConfig.port, appConfig.host, (error) => {
    if (error) throw error;

    logger.info(`Started! Listening to ${appConfig.host}:${appConfig.port}`, { label: 'server' });
  });
}
