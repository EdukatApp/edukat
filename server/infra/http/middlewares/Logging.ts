import { Request, Response, NextFunction } from 'express';

import logger from '~/logger';
import type { IMiddleware } from '~/types';

export default class LoggingMiddleware implements IMiddleware {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction,
    label: string,
  ): Promise<void> {
    logger.http(
      `${request.ip} - "${request.method} ${request.url}" "${request.headers['user-agent']}"`,
      {
        label,
      },
    );

    next();
  }
}
