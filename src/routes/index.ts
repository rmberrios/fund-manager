import express, { Express, Request, Response } from 'express';
import fundRouter from "./funds";

export default function injectRouter(app: Express) {
  app.get('/', (req: Request, res: Response) => {
    res.json({ message: "ok" });
  })

  app.use('/funds', fundRouter);
}