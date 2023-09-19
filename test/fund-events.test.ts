
import request from "supertest";
import app from "../src/app";
import sequelize from "../src/services/db";
import { FUND_EVENTS, eventStatus } from "../src/models/event";

jest.setTimeout(10 * 1000);
describe('Fund Events', () => {
  beforeEach(async () => {
    await sequelize.models.fund.destroy({
      where: {
        startYear: 3000
      },
    });
    await sequelize.models.event.destroy({
      where: {
        type: FUND_EVENTS.DUPLICATE_FUND_WARNING
      },
    });
    const fundManager = await sequelize.models.fundManager.create({
      name: "Jack",
      lastname: "Sparrow"
    });

    const fund = await sequelize.models.fund.create(
      {
        alias: ["lion", "puma"],
        name: "awesome fund",
        startYear: 3000,
        fundManagerId: fundManager.dataValues.id
      });

    await sequelize.models.fund.create(
      {
        alias: [],
        name: "lion",
        startYear: 3000,
        fundManagerId: fundManager.dataValues.id
      })
  });

  afterEach(async () => {
    await sequelize.models.fund.destroy({
      where: {
        startYear: 3000
      },
    });
    await sequelize.models.event.destroy({
      where: {
        type: FUND_EVENTS.DUPLICATE_FUND_WARNING
      },
    });
  });

  it(`should emit ${FUND_EVENTS.DUPLICATE_FUND_WARNING}`, async () => {

    const eventFound = await sequelize.models.event.findOne({
      where: {
        type: FUND_EVENTS.DUPLICATE_FUND_WARNING,

      }
    });

    expect(eventFound?.dataValues.type).toBe(FUND_EVENTS.DUPLICATE_FUND_WARNING);


  });
});