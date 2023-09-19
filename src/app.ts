import express, { Express, Request, Response } from 'express';

import injectRouter from "./routes/index";
import middleware from './middleware';
import { registerEventEmitter } from './services/queue';
import { registerFundEvents } from './services/fund-events';

const app: Express = express();

registerEventEmitter(app);
middleware(app);
injectRouter(app);

// Event driven service
registerFundEvents(app)

export default app;