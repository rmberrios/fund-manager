import express, { Express, Request, Response } from 'express';
const eventEmitterLabel = 'EVENT_EMITTER';
import events from "events";

// Persist event emitter through a singleton Pattern
function registerEventEmitter(app: Express) {
  const eventEmitter = new events.EventEmitter();
  app.set(eventEmitterLabel, eventEmitter);
}

function getEventEmitter(app: Express): events.EventEmitter {
  return app.get(eventEmitterLabel) as events.EventEmitter;
}

export { registerEventEmitter, getEventEmitter }

