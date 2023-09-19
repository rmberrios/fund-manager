import events from "events";
import express, { Express, Request, Response } from 'express';
import { getEventEmitter } from "./queue";
import sequelize from "./db";
import { FUND_EVENTS, eventStatus } from "../models/event";


export function registerFundEvents(app: Express) {
  const eventEmitter = getEventEmitter(app);
  eventEmitter.on(FUND_EVENTS.DUPLICATE_FUND_WARNING, (async data => {
    const eventCreated = await sequelize.models.event.create({
      type: FUND_EVENTS.DUPLICATE_FUND_WARNING,
      bundle: data,
    });

    //  If a new fund is created with a name and manager that matches the name or an alias of an existing fund with the same manager
    console.log(`Event triggered ${FUND_EVENTS.DUPLICATE_FUND_WARNING}`, data);
    await eventCreated.update({ status: eventStatus.FINISHED, bundle: data });
  }));

}

export function emitDuplicateFundWarning(app: Express, bundle: any) {
  const eventEmitter = getEventEmitter(app);

  eventEmitter.emit(FUND_EVENTS.DUPLICATE_FUND_WARNING, bundle);
}



