import { Request, Response, NextFunction } from 'express';
import { LoggerFactory } from '../services/logger/logger.factory';
import { RequestLogOutputBuilder } from '../builder';
import dotenv from 'dotenv';
dotenv.config();

const requestLogger = function(req: Request, res: Response, next: NextFunction) {
  const logger = LoggerFactory.createLogger(process.env.LOGGER_TYPE || 'console');
  const logMessage = new RequestLogOutputBuilder()
    .setRequestUrl(req.url)
    .setRequestMethod(req.method)
    .setRequestParams(req.params)
    .setRequestQuery(req.query)
    .setRequestBody(req.body)
    .build();

  logger.log(logMessage);
  next();
};

export default requestLogger;