import { Sequelize } from 'sequelize';
import config from '../config';

import companyInit from "../models/company";
import fundInit, {association as fundAssociation} from "../models/fund";
import fundManagerInit, { association as fundManagerAssociation } from "../models/fund-manager";
import eventInit from "../models/event";

if (!(config.DB.host && config.DB.port && config.DB.database && config.DB.user && config.DB.password)) {
  throw Error("Missing DB environment variables")
}
const sequelize = new Sequelize(config.DB.database, config.DB.user, config.DB.password, {
  dialect: "mysql",
  host: config.DB.host,
  port: parseInt(config.DB.port),
  logQueryParameters: true,
  benchmark: true,
  define: {
    hooks: {
      beforeCreate: (record, options) => {
        record.dataValues.createdAt = new Date();
        record.dataValues.updatedAt = new Date();
      },
      beforeUpdate: (record, options) => {
        record.dataValues.updatedAt = new Date();
      }
    }
  }
});

const modelDefiners = [
  fundManagerInit,
  companyInit,
  fundInit,
  eventInit,
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// Run Associations
fundManagerAssociation(sequelize);
fundAssociation(sequelize);
export default sequelize;