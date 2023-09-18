import express, { Express, Request, Response } from 'express';
import config from './config';
import injectRouter from "./routes/index";

const port = config.APP.expressPort;
const app: Express = express();

injectRouter(app);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});