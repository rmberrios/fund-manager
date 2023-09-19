import express, { Express, Request, Response, NextFunction } from 'express';
import winston from "winston";
import bodyParser from "body-parser";
import helmet from "helmet";
import { parseQueryToInteger } from './utils/helper';
import config from './config';

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

const resSendInterceptor = (res: Response, send: any) => (content: any) => {
  res.locals.content = content;
  res.send = send;
  res.send(content);
};
export async function pageQueryMiddleware(req: Request, res: Response, next: NextFunction) {
  const page = parseQueryToInteger(req.query.page) || 0;
  const limit = parseQueryToInteger(req.query.limit) || config.APP.listPerPage;

  const offset = limit * page;

  res.locals.page = page;
  res.locals.limit = limit;
  res.locals.offset = offset;
  next();
}

export function paginationMiddleware(req: Request, res: Response, next: NextFunction) {
  const { rows, count } = res.locals.collection;
  res.json({
    rows,
    count,
    page: res.locals.page,
    limit: res.locals.limit,

  });
}
export default function middleware(app: Express) {
  app.use((req: Request, res: any, next) => {
    res.send = resSendInterceptor(res, res.send);
    res.on("finish", () => {

      logger.info(`Received a ${req.method} request fdor ${req.path} response ${res.locals.content}`);
    });
    next();
  });

  app.use(helmet())
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });

    return;
  });
}