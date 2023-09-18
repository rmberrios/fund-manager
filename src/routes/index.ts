import express, { Express, Request, Response } from 'express';
import fundRouter from "./funds";

export default function injectRouter(app: Express) {
    app.use('/funds', fundRouter);
}