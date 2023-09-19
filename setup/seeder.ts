import { faker } from '@faker-js/faker';
import sequelize from '../src/services/db';
import sample from "lodash.sample";
import { Model } from 'sequelize';

const getAliasSuggestions = () => {
  const suggestion = [
    faker.animal.bear,
    faker.animal.bird,
    faker.animal.cat,
    faker.animal.cetacean,
    faker.animal.cow,
    faker.animal.crocodilia,
    faker.animal.dog,
    faker.animal.fish,
    faker.animal.horse,
    faker.animal.insect,
    faker.animal.lion,
    faker.animal.rabbit,
    faker.animal.rodent,
    faker.animal.snake,
    faker.animal.type,

  ];
  const random = Math.floor(Math.random() * suggestion.length);
  return [...Array(Math.floor(Math.random() * 5))].map(() => suggestion[random]());
}

async function createRandomCompany() {
  const items = [...Array(30)].map((company) => (
    {
      name: faker.company.name(),

    }
  ))
  const companies = await sequelize.models.company.bulkCreate(items);


  return companies;
}

async function createRandomFundManagers(companyCreated: Model<any, any>[]) {

  const items = [...Array(120)].map(() => {

    return (
      {
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        companyId: (sample(companyCreated) as any).id
      })
  });


  const fundManagers = await sequelize.models.fundManager.bulkCreate(items);


  return fundManagers;
}

async function createRandomFunds(fundManagerCreated: Model<any, any>[]) {

  const items = [...Array(300)].map(() => (
    {
      alias: getAliasSuggestions(),
      name: faker.company.buzzPhrase(),
      startYear:faker.number.int({ min: 2000, max: 2023 }),
      fundManagerId: (sample(fundManagerCreated) as any).id
    }
  ));

  const funds = await sequelize.models.fund.bulkCreate(items);

  await sequelize.models.fund.create({alias: [], name: "Belgian Shepherd", startYear: 2020, fundManagerId: 387 })

  return funds;
}

(async () => {
  const companyCreated = await createRandomCompany();
  const fundManagerCreated = await createRandomFundManagers(companyCreated);
  await createRandomFunds(fundManagerCreated);
})();