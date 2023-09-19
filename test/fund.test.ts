
import request from "supertest";
import app from "../src/app";
import sequelize from "../src/services/db";

describe('Funds', () => {
  beforeEach(async () => {
    await sequelize.models.fund.destroy({
      where: {
        startYear: 3000
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
      })
  });

  afterEach(async () => {
    await sequelize.models.fund.destroy({
      where: {
        startYear: 3000
      },
    });
  });

  it('should return a list of all funds', async () => {

    const response = await request(app)
      .get('/funds?year=3000&&fundManagerName=ac&&name=some');

    expect(response.statusCode).toBe(200);
    expect(response.body.rows).toHaveLength(1);
    expect(response.body.count).toBe(1);;
    expect(response.body.page).toBe(0);;
    expect(response.body.limit).toBe(10);;
  });

  it('should update an existing fund', async () => {
    const responseFromList = await request(app)
      .get('/funds?year=3000&&fundManagerName=ac&&name=some');

    const fundId = responseFromList.body.rows[0].id;
    const response = await request(app)
      .post(`/funds/${fundId}`)
      .send({ name: 'john updated' });

    expect(response.statusCode).toBe(200);
    expect(response.body.fund.name).toBe('john updated');

  });
});